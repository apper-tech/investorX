
import { AppLayoutComponent } from './layout';
import { NominationComponent } from './pages/nomination/nomination.component';
import { VotingComponent } from './pages/voting/voting.component';
import { ElectionManagmentComponent } from './pages/election-managment/election-managment.component';
import { DeploymentNetworkComponent } from './pages/deployment-network/deployment-network.component';

import { CanActivateChairperson } from './util/canactivatechairperson';

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: '/voting', pathMatch: 'full' },
      { path: 'nomination', component: NominationComponent, data: { title: 'Nomination' } },
      { path: 'voting', component: VotingComponent, data: { title: 'Voting' } },
      { path: 'deployment-network', component: DeploymentNetworkComponent, data: { title: 'Testnet' } },
      {
        path: 'election-managment', component: ElectionManagmentComponent, data: { title: 'Election Management' },
        canActivate: [CanActivateChairperson]
      },
    ]
  },
];
