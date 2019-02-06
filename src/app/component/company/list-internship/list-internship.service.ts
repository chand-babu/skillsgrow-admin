import { Injectable } from '@angular/core';
import { Constants } from '../../../../common/constant';
import { HttpUtil } from '../../../../common/http.util';
import 'rxjs/add/operator/map';



@Injectable()
export class ListInternshipService {

    constructor(public http: HttpUtil) { }

    listInternship(id) {
        return this.http.doGet(Constants.APIPATH + Constants.INTERNSHIP + '/' + id, false);
    }

    changeInternshipStatus(data) {
        return this.http.doPut(Constants.APIPATH + Constants.INTERNSHIP_STATUS,data, false);
    }
}
