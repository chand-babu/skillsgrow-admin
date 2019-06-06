import { Injectable } from '@angular/core';
import { Constants } from './../../../../common/constant';
import { HttpUtil } from './../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from '../../../../common/global';


@Injectable()
export class BlogCommentListProxy {

    constructor(public http: HttpUtil, public global: Global) {
    }

    blogCommentListData() {
        return this.http.doGet(Constants.APIPATH + 'admin/blog-comment-list', true);
    }

    activeAndInactiveBlogComment(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/updateBlogCommentStatus', data, false);
    }

    blogCommentDelete(id) {
        return this.http.doDelete(Constants.APIPATH + 'admin/blog-comment-delete/' + id, false);
    }

}