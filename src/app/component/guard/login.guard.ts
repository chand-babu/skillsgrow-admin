import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Global } from '../../../common/global';
import { Observable } from 'rxjs/observable';
import { LoginService } from './login.service';
import { map, take } from 'rxjs/operators';

@Injectable()

export class LoginGuard implements CanActivate {

    constructor(private global: Global, private router: Router,
    private loginservice: LoginService) {
    }

    /* canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.loginservice.isLoggedIn.pipe(
          take(1),
          map((isLoggedIn: boolean) => {
            if (!isLoggedIn) {
              this.router.navigate(['/login']);
              return false;
            }
            return true;
          })
        );
      } */

      loggedIn() {
          return !!this.global.getStorageDetail('token');
      }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']).then(result => console.log(result + 'Not Redirected'));
            return false;
        }
    }
}
