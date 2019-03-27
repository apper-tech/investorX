import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

declare let require: any;
const Web3 = require('web3');

import contract from 'truffle-contract';

// Without the following line an error will occur: TypeError: truffle_contract_1.default is not a function
const contract = require('truffle-contract');


declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  public get Web3(): any {
    return this.web3;
  }
  private accounts: string[];
  public get wallet(): string {
    if (this.accounts != null && this.accounts.length !== 0) {
      return this.accounts[0];
    } else {
      return null;
    }
  }
  public ready = false;

  public network = '';

  public accountsObservable = new ReplaySubject<string>(1);

  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3() {

    if (window.ethereum) {
      // use MetaMask's provider
      this.web3 = new Web3(window.ethereum);
      window.ethereum.enable(); // get permission to access accounts
    } else {
      console.warn(
        'No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live',
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://127.0.0.1:8545'),
        // Similar URL could be used for staging and production:
        // 'https://ropsten.infura.io/koMImLwOWG3Bsc2hI81Dz'
        // 'https://mainnet.infura.io/koMImLwOWG3Bsc2hI81Dz'
      );
    }
    this.web3.eth.net.getNetworkType().then(networkName => {
      this.network = networkName;
    });

    setInterval(() => this.refreshAccounts(), 340);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

  }
  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
        return;
      }

      if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
        console.log('Observed new accounts');

        this.accounts = accs;
        this.accountsObservable.next(accs);
      }

      this.ready = true;
    });
  }
}

