import { Component, OnInit } from '@angular/core';
import { ElectionService } from '../../util/election.service';
import { GURU_COLUMNS, Guru } from '../../classes/guru';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {

  // datatable columns'
  cols: any = GURU_COLUMNS;

  constructor(public electionService: ElectionService) { }

  ngOnInit() {
    this.refresh();
  }

  async vote(guru: Guru) {
    try {
      await this.electionService.vote(guru.wallet);

      this.refresh();
    } catch (e) {
      console.log('Error update Contest!');
      console.log(e);
    }
  }

  async refresh() {
    this.electionService.readGurus();
  }

}
