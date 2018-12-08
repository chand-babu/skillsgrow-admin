import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../../common/constant';
import { HttpUtil } from './../../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class LoginProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    adminLogin(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/login', data);
    }

    browserDetails() {
        return this.mannualHttp.get('https://api.ipify.org/?format=json')
        .map((response: Response) => response);
    }

    adminToken(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/token', data);
    }

    TokenDestroy(userId) {
        return this.http.doDelete(Constants.APIPATH + 'admin/delete-token/' + userId)
       .map((response: Response) => response);
    }

}
