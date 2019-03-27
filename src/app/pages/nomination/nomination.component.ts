import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../util/election.service';
import { Web3Service } from '../../util/web3.service';
import { Guru } from '../../classes/guru';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {

  name: string;
  wallet: string;

  isAlreadNominated: boolean;

  constructor(public web3Service: Web3Service,
    public electionService: ElectionService) { }

  ngOnInit() {
    this.web3Service.accountsObservable.subscribe(accs => {
      this.fillGuru();
      this.electionService.electionModel.chairpersonObservable.subscribe(cp =>
        this.wallet = this.electionService.isCurrentUserTheElectionChairperson ? undefined : this.web3Service.wallet
      );
    });
  }

  async fillGuru() {
    const guru: Guru = await this.electionService.getGuru(this.web3Service.wallet);
    if (guru !== null) {
      this.name = guru.name;
      this.isAlreadNominated = true;
    } else {
      this.name = undefined;
      this.isAlreadNominated = false;
    }
  }

  async nominateGuru() {
    if (this.wallet == null || this.name == null) {
      if (this.name == null) {
        this.name = ''; // Will trigger the required-field message
      }
      if (this.wallet == null) {
        this.wallet = ''; // Will trigger the required-field message
      }
      return;
    }
    if (this.electionService.isCurrentUserTheElectionChairperson === true) {
      await this.electionService.addGuru(this.name, this.wallet);
    } else {
      await this.electionService.beGuru(this.name);
    }
    await this.fillGuru();
  }

}
