import { Injectable } from '@angular/core';
import { Constants } from '../../../../common/constant';
import { HttpUtil } from '../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from '../../../../common/global';


@Injectable()
export class SubAdminService {

    constructor(public http: HttpUtil, public global: Global) {
    }

    listSubAdmin() {
        return this.http.doGet(Constants.APIPATH + Constants.ADMIN, false);
    }

    getSubAdmin(id) {
        return this.http.doGet(Constants.APIPATH + Constants.ADMIN + '/' + id, false);
    }

    addSubAdmin(data) {
        return this.http.doPost(Constants.APIPATH + Constants.ADMIN,
            data, false);
    }

    updateSubAdmin(data) {
        return this.http.doPut(Constants.APIPATH + Constants.ADMIN,
            data, false);
    }

    deleteSubAdmin(id) {
        return this.http.doDelete(Constants.APIPATH + Constants.ADMIN + '/' + id);
    }

}
