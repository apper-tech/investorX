import { Injectable } from '@angular/core';
import * as ElectionJson from '../contracts/Election.json'; // current main contract to check

@Injectable({
  providedIn: 'root'
})
// contrat deployment used to check current network in mist or metamask
export class ContractDeploymentService {

  public deployedNetworks = [];
  constructor() {
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
