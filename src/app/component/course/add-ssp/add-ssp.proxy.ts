import { Injectable } from '@angular/core';
import { Constants } from './../../../../common/constant';
import { HttpUtil } from './../../../../common/http.util';
import 'rxjs/add/operator/map';

@Injectable()


export class AddSSPProxy {

    constructor(public http: HttpUtil) {}

    addSSP(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/add-ssp', data);
    }

    getSSP() {
        return this.http.doGet(Constants.APIPATH + 'admin/get-ssp/' + 3);
    }

    updateSSP(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/add-ssp', data);
    }

    deleteSSP(id) {
        return this.http.doDelete(Constants.APIPATH + 'admin/add-ssp/' + id);
    }

    checkEmail(emailId) {
        return this.http.doGet(Constants.APIPATH + 'admin/check-email/' + emailId, true);
    }

}
