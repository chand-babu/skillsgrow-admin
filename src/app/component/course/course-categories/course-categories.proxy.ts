import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../../../common/constant';
import { HttpUtil } from './../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from '../../../../common/global';


@Injectable()
export class CourseCategoryProxy {

    constructor(public http: HttpUtil, public global: Global) {
    }

    uploadImageCategory(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/upload',
            data, false);
    }

    categoryFormData(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/add-category',
        data, false);
    }

    CategoryListData() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories', false);
    }

    activeAndInactive(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/update-category', data, false);
    }

    addAdmin(data) {
        console.log(data);
        return this.http.doPost(Constants.APIPATH + 'admin/add', data, false);
    }

}
