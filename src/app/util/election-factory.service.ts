import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Web3Service } from './web3.service';

import { ElectionFactoryModel } from '../classes/electionfactorymodel';

declare let require: any;
const electionFactory_artifacts = require('../../../build/contracts/ElectionFactory.json');

@Injectable({
  providedIn: 'root'
})
export class ElectionFactoryService {

  ElectionFactoryContract: any;
  electionFactoryModel: ElectionFactoryModel;
  public isCurrentUserTheFactoryChairperson: boolean;

  constructor(private web3Service: Web3Service) {
    this.initializeVariables();
  }

  private async initializeVariables() {
    this.electionFactoryModel = new ElectionFactoryModel();
    this.ElectionFactoryContract = await this.web3Service.artifactsToContract(electionFactory_artifacts);
    this.web3Service.accountsObservable.subscribe(wallet => this.updateChairperson());
  }

  private async updateChairperson() {
    try {
      const deployedContract = await this.ElectionFactoryContract.deployed();
      const chairperson = await deployedContract.chairperson.call();
      // Has to be updated before updating electionFactoryModel.chairperson.
      //  Becuase, electionFactoryModel.chairperson is used as an event at some code-blocks.
      this.isCurrentUserTheFactoryChairperson = chairperson === this.web3Service.wallet;
      this.electionFactoryModel.chairperson = chairperson;
    } catch (e) {
      console.log('Error at Election->updateChairperson()');
      console.log(e);
      throw e;
    }
  }
}
