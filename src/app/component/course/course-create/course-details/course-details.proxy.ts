import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../../../../common/constant';
import { HttpUtil } from './../../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from './../../../../../common/global';


@Injectable()
export class CourseDetailsProxy {

    constructor(public http: HttpUtil, public global: Global) {
    }

    CategoryListData() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories', false);
    }

    uploadImageCategory(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/upload',
            data, false);
    }

    addCourseDetails(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/add-course',
            data, false);
    }

    updateCourse(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/update-course',
            data, false);
    }

}
