import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { Web3Service } from './util/web3.service';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

import {
  AppLayoutComponent, AppFooterComponent, AppHeaderComponent, AppNavComponent
} from './layout';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';


import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routing';
import { SharedModule } from './shared';
import { ElectionService } from './util/election.service';
import { ElectionFactoryService } from './util/election-factory.service';
import { NominationComponent } from './pages/nomination/nomination.component';
import { VotingComponent } from './pages/voting/voting.component';
import { ElectionManagmentComponent } from './pages/election-managment/election-managment.component';
import { DeploymentNetworkComponent } from './pages/deployment-network/deployment-network.component';

@NgModule({
  declarations: [
    AppComponent,

    AppLayoutComponent, AppFooterComponent, AppHeaderComponent,
    AppNavComponent,

    MessagesComponent,
    NominationComponent,
    VotingComponent,
    ElectionManagmentComponent,
    DeploymentNetworkComponent

  ],
  imports: [

    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,

    MenuModule,
    MenubarModule,
    CardModule,

    SharedModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === true,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [
  ],
  providers: [Web3Service, MessageService, ElectionService, ElectionFactoryService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
