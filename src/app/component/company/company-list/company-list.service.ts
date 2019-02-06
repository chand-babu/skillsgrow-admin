import { Injectable } from '@angular/core';
import { Constants } from '../../../../common/constant';
import { HttpUtil } from '../../../../common/http.util';
import 'rxjs/add/operator/map';



@Injectable()
export class CompanyListService {

    constructor(public http: HttpUtil) { }

    listCompany() {
        return this.http.doGet(Constants.APIPATH + Constants.COMPANY, false);
    }

    changeCompanyStatus(data) {
        return this.http.doPut(Constants.APIPATH + Constants.COMPANY,data, false);
    }
}
