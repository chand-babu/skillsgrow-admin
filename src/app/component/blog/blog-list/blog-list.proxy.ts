import { Injectable } from '@angular/core';
import { Constants } from './../../../../common/constant';
import { HttpUtil } from './../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from '../../../../common/global';


@Injectable()
export class BlogListProxy {

    constructor(public http: HttpUtil, public global: Global) {
    }

    BlogListData() {
        return this.http.doGet(Constants.APIPATH + 'admin/blog-list', true);
    }

    activeAndInactiveBlog(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/updateBlogStatus', data, false);
    }

    blogDelete(id) {
        return this.http.doDelete(Constants.APIPATH + 'admin/blog-delete/' + id, false);
    }

}