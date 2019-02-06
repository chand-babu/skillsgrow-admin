import { Injectable } from '@angular/core';
import { Constants } from '../../../../common/constant';
import { HttpUtil } from '../../../../common/http.util';
import 'rxjs/add/operator/map';



@Injectable()
export class ListAppliedService {

    constructor(public http: HttpUtil) { }

    listApplied(company,intern) {
        return this.http.doGet(Constants.APIPATH + Constants.LIST_INTERNSHIP_APPLLIED + '/' + company+'/' + intern, false);
    }

    changeAppliedStatus(data) {
        return this.http.doPut(Constants.APIPATH + Constants.INTERNSHIP_STATUS,data, false);
    }
}
