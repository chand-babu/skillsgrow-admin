import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../../common/constant';
import { HttpUtil } from '../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from '../../../../common/global';


@Injectable()
export class RollsPermissionsService {

    constructor(public http: HttpUtil, public global: Global) {
    }

    listRollsPermissions() {
        return this.http.doGet(Constants.APIPATH + Constants.ROLLS_PERMISSIONS, false);
    }

    getRollsPermissions(id) {
        return this.http.doGet(Constants.APIPATH + Constants.ROLLS_PERMISSIONS + '/' + id, false);
    }

    addRollsPermissions(data) {
        return this.http.doPost(Constants.APIPATH + Constants.ROLLS_PERMISSIONS,
            data, false);
    }

    updateRollsPermissions(data) {
        return this.http.doPut(Constants.APIPATH + Constants.ROLLS_PERMISSIONS,
            data, false);
    }

    deleteRollsPermissions(id) {
        return this.http.doDelete(Constants.APIPATH + Constants.ROLLS_PERMISSIONS + '/' + id);
    }

}
