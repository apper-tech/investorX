import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Web3Service } from './web3.service';

import { ElectionModel } from '../classes/electionmodel';
import { Guru } from '../classes/guru';
import { stringify } from '@angular/core/src/util';
// import { EventsHelper } from '../classes/eventshelper';

declare let require: any;
const Election_artifacts = require('../../../build/contracts/Election.json');

@Injectable(
  { providedIn: 'root' }
)
export class ElectionService {

  ElectionContract: any;
  public electionModel: ElectionModel = new ElectionModel();
  public isCurrentUserTheElectionChairperson: boolean;

  constructor(private web3Service: Web3Service) {
    this.initializeVariables();
  }

  private async initializeVariables() {
    this.ElectionContract = await this.web3Service.artifactsToContract(Election_artifacts);
    this.web3Service.accountsObservable.subscribe(wallet => this.updateChairperson());
    const deployedContract = await this.ElectionContract.deployed();

    // Events cannot work if Web3 v1 and Ganache 6 used:
    // https://ethereum.stackexchange.com/questions/58072/watching-solidity-event-gives-error-typeerror-watch-is-not-a-function/66022#66022
    // For that I did not use events.
    // EventsHelper.listen(this.ElectionContract.events.ElectionOpened({}), function (args) { console.log(args.name) })
  }

  public async updateChairperson() {
    try {
      const deployedContract = await this.ElectionContract.deployed();
      const chairperson = await deployedContract.chairperson.call();
      // Has to be updated before updating electionFactoryModel.chairperson.
      //  Becuase, electionFactoryModel.chairperson is used as an event at some code-blocks.
      this.isCurrentUserTheElectionChairperson = chairperson === this.web3Service.wallet;
      this.electionModel.chairperson = chairperson;
    } catch (e) {
      console.log('Error at Election->updateChairperson()');
      console.log(e);
      throw e;
    }
  }

  public async readGurus() {
    try {
      if (this.ElectionContract === undefined) {
        // This method is called before this.ElectionContract is initialized
      } else {
        const deployedContract = await this.ElectionContract.deployed();
        const gurusCount = parseInt(await deployedContract.getGurusCount.call(), 10);
        if (this.electionModel.gurus === undefined || this.electionModel.gurus.length !== gurusCount) {
          this.electionModel.gurus = new Array(gurusCount);
        }
        for (let index = 0; index < gurusCount; index++) {
          if (this.electionModel.gurus[index] === undefined) {
            this.electionModel.gurus[index] = new Guru();
          }

          const gurusWallet = await deployedContract.gurusArray.call(index);
          this.electionModel.gurus[index].wallet = gurusWallet;
          const gurusRaw = await deployedContract.gurus.call(gurusWallet);
          this.electionModel.gurus[index].name = this.web3Service.Web3.utils.toUtf8(gurusRaw[0]);
          const votesCount = parseInt(await deployedContract.getVotesCount.call(gurusWallet), 10);
          this.electionModel.gurus[index].votesCount = votesCount;
          this.electionModel.gurus[index].isElectedByCurrentUser =
            await deployedContract.isElectedBy.call(this.electionModel.gurus[index].wallet,
              this.web3Service.wallet);
        }
      }
    } catch (e) {
      console.log('Error at Election->readGurus()');
      console.log(e);
      throw e;
    }
    // Events still having issues in the current versions as discussed here:
    // https://ethereum.stackexchange.com/questions/58072/watching-solidity-event-gives-error-typeerror-watch-is-not-a-function/66022#66022
    // For that I am calling this method with a timer:
    const delay = new Promise(resolve => setTimeout(resolve, 1000));
    await delay;
    this.readGurus();
  }

  public async getGuru(gurusWallet: string): Promise<Guru> {
    const deployedContract = await this.ElectionContract.deployed();
    const gurusRaw = await deployedContract.gurus.call(gurusWallet);
    const guru = new Guru();
    guru.name = this.web3Service.Web3.utils.toUtf8(gurusRaw[0]);
    if (guru.name === '') {
      return null;
    }
    const votesCount = parseInt(await deployedContract.getVotesCount.call(gurusWallet), 10);
    guru.votesCount = votesCount;
    guru.wallet = gurusWallet;
    return guru;
  }

  private async getGurusCount(): Promise<number> {
    try {
      const deployedContract = await this.ElectionContract.deployed();
      return parseInt(await deployedContract.getGurusCount.call(), 10);
    } catch (e) {
      console.log('Error at Election->getGurusCount()');
      console.log(e);
      throw e;
    }
  }

  public async beGuru(name: string) {
    try {
      const deployedContract = await this.ElectionContract.deployed();
      const transaction = await deployedContract.beGuru(this.web3Service.Web3.utils.fromUtf8(name),
        { from: this.web3Service.wallet });

      // TODO: use messageService
      if (!transaction) {
        throw new Error('Transaction failed!');
      } else {
        console.log('Transaction complete!');
        // TODO: Update UI
      }
    } catch (e) {
      console.log('Error at Election->beGuru(' + name + ')');
      console.log(e);
      throw e;
    }
  }

  public async addGuru(name: string, wallet: string) {
    try {
      const deployedContract = await this.ElectionContract.deployed();
      const transaction = await deployedContract.addGuru(this.web3Service.Web3.utils.fromUtf8(name), wallet,
        { from: this.web3Service.wallet });

      // TODO: use messageService
      if (!transaction) {
        throw new Error('Transaction failed!');
      } else {
        console.log('Transaction complete!');
        // TODO: Update UI
      }
    } catch (e) {
      console.log('Error at Election->addGuru(' + name + ', ' + wallet + ')');
      console.log(e);
      throw e;
    }
  }

  public async vote(guruWallet: string) {
    try {
      const deployedContract = await this.ElectionContract.deployed();
      const transaction = await deployedContract.vote(guruWallet, { from: this.web3Service.wallet });
      // TODO: use messageService
      if (!transaction) {
        throw new Error('Transaction failed!');
      } else {
        console.log('Transaction complete!');
        // TODO: Update UI
      }
    } catch (e) {
      console.log('Error at Election->vote(' + guruWallet + ')');
      console.log(e);
      throw e;
    }
  }

  public async getVotesCount(guruWallet: string) {
    try {
      const deployedContract = await this.ElectionContract.deployed();
      return await parseInt(deployedContract.getVotesCount.call(guruWallet), 10);
    } catch (e) {
      console.log('Error at Election->getGurusCount()');
      console.log(e);
      throw e;
    }
  }

  public async close() {
    try {
      const deployedContract = await this.ElectionContract.deployed();
      const transaction = await deployedContract.close();

      // TODO: use messageService
      if (!transaction) {
        throw new Error('Transaction failed!');
      } else {
        console.log('Transaction complete!');
        // TODO: Update UI
      }
    } catch (e) {
      console.log('Error at Election->close(' + name + ')');
      console.log(e);
      throw e;
    }
  }
}
