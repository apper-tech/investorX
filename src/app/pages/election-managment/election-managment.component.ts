import { Component, OnInit } from '@angular/core';
import { ElectionFactoryService } from '../../util/election-factory.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-election-managment',
  templateUrl: './election-managment.component.html',
  styleUrls: ['./election-managment.component.css']
})
export class ElectionManagmentComponent implements OnInit {

  constructor(private electionFactoryService: ElectionFactoryService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.electionFactoryService.electionFactoryModel.chairpersonObservable.subscribe((chairperson) => {
      if (!this.electionFactoryService.isCurrentUserTheFactoryChairperson) {
        this.router.navigate(['/']);
      }
    });
  }

}
