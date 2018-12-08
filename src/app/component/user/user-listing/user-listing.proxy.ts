import { Injectable } from '@angular/core';
import { Constants } from '../../../../common/constant';
import { HttpUtil } from '../../../../common/http.util';
import 'rxjs/add/operator/map';



@Injectable()
export class UserListingProxy {

    constructor(public http: HttpUtil) { }

    listUserDetails() {
        return this.http.doGet(Constants.APIPATH + Constants.USER_LIST_API, false);
    }
}
