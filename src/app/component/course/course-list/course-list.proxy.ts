import { Injectable } from '@angular/core';
import { Constants } from './../../../../common/constant';
import { HttpUtil } from './../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from '../../../../common/global';


@Injectable()
export class CourseListProxy {

    constructor(public http: HttpUtil, public global: Global) {
    }

    CategoryListData() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories', false);
    }

    activeAndInactive(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/course-status', data, false);
    }

    trendingCourseView(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/view-trending-course', data, false);
    }

    courseDelete(id) {
        return this.http.doDelete(Constants.APIPATH + 'admin/course-delete/' + id, false);
    }

}
