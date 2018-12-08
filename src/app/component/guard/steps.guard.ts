import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Global } from '../../../common/global';
import { Observable } from 'rxjs/observable';
import { LoginService } from './login.service';
import { map, take } from 'rxjs/operators';

@Injectable()

export class StepsGuard implements CanActivate {

    constructor(private global: Global, private router: Router,
    private loginservice: LoginService) {
    }

    isCourseDataAvailable() {
        return !!this.global.getStorageDetail('courseDataStatus');
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isCourseDataAvailable()) {
            return true;
        } else {
            this.router.navigate(['/course/list']);
            return false;
        }
    }
}
