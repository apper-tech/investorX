import { Component, OnInit } from '@angular/core';
import { MenubarModule, } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Web3Service } from '../../util/web3.service';
import { ElectionFactoryService } from '../../util/election-factory.service';

@Component({
  selector: 'jhi-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {

  public items: MenuItem[];

  constructor(public web3Service: Web3Service,
    public electionFactoryService: ElectionFactoryService) {
  }

  ngOnInit() {
    this.electionFactoryService.electionFactoryModel.chairpersonObservable.subscribe((chairperson) => { this.fillMenuItems(); });
  }

  private fillMenuItems() {
    this.items = [
      {
        label: 'Nomination',
        routerLink: ['/nomination'],
      },
      {
        label: 'Voting',
        routerLink: ['/voting'],
      },
      {
        label: 'Election Management',
        routerLink: ['/election-managment'],
        visible: this.electionFactoryService.isCurrentUserTheFactoryChairperson,
      },
    ];
  }
}
