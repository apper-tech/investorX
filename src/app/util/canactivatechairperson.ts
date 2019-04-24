import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ElectionFactoryService } from './election-factory.service';


export class UserToken {
  isChairPerson: boolean;
}
export class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    console.log(user);
    console.log(id);
    return user.isChairPerson;
  }
  canLoad(user: UserToken, path: string): boolean {
    console.log(user);
    console.log(path);
    return user.isChairPerson;
  }
}

@Injectable()
export class CanActivateChairperson implements CanActivate {
  constructor(private electionFactoryService: ElectionFactoryService,
    private permissions: Permissions, private currentUser: UserToken) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.electionFactoryService.electionFactoryModel.chairpersonObservable.subscribe(ch => {
        this.currentUser.isChairPerson = this.electionFactoryService.isCurrentUserTheFactoryChairperson;
        const canActivate = this.permissions.canActivate(this.currentUser, route.params.id);
        resolve(canActivate);
      }, reject);
    });
  }
}
