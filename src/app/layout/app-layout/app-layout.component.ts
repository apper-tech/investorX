import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Web3Service } from '../../util/web3.service';
import { ContractDeploymentService } from '../../util/contract-deployment.service';

@Component({
    selector: 'jhi-layout',
    templateUrl: './app-layout.component.html'
})
export class AppLayoutComponent implements OnInit {
    title: string;
    hideTitle: boolean;
    wrapClass: boolean;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private web3Service: Web3Service,
        private contractService: ContractDeploymentService
    ) {
    }

    ngOnInit() {
        this.updateTitle();

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateTitle();
            }
        });
    }

    updateTitle() {
        this.title = this.getPageTitle(this.router.routerState.snapshot.root);
        ;
    }


    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['title']) ? routeSnapshot.data['title'] : 'InvestorX';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    onActive(event) {

        console.log(event);

        if (event.hideTitle) {
            this.hideTitle = event.hideTitle;
        } else {
            this.hideTitle = false;
        }

        if (event.wrapClass) {
            this.wrapClass = event.wrapClass;
        } else {
            this.wrapClass = false;
        }

          // navigate to testnet page if not on correct network
          if (!this.contractService.deployedNetworks.includes(this.web3Service.network)) {
            this.router.navigate(['/testnet']);
        }
    }

}
