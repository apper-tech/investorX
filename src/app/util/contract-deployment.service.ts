import { Injectable } from '@angular/core';
import { Web3Service } from '../util/web3.service';
import * as ElectionJson from '../contracts/Election.json'; // current main contract to check
@Injectable()
// contrat deployment used to check current network in mist or metamask
export class ContractDeploymentService {

  public deployedNetworks = [];
  constructor(private ser: Web3Service) {
    this.GetNetworks();
  }
  private async GetNetworks() {
    const net = ElectionJson.networks;
    if (net[1]) { this.deployedNetworks.push('main'); }
    if (net[42]) { this.deployedNetworks.push('kovan'); }
    if (net[3]) { this.deployedNetworks.push('ropsten'); }
    if (net[4]) { this.deployedNetworks.push('rinkeby'); }
  }
}
