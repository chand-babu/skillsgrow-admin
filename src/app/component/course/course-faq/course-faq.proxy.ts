import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../../../common/constant';
import { HttpUtil } from './../../../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class CourseFaqProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    courseFaqService(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/course-faq', data);
    }

    courseFaqDeleteService(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/delete-faq', data);
    }

}
