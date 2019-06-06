import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../../../common/constant';
import { HttpUtil } from '../../../../common/http.util';
import 'rxjs/add/operator/map';
import { Global } from '../../../../common/global';


@Injectable()
export class BlogCreateProxy {

    constructor(public http: HttpUtil, public global: Global) {
    }

    CategoryListData() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-categories', false);
    }
    
    uploadImageCategory(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/upload',
            data, false);
    }

    blogFormData(data) {
        // console.log("proxy file",data)
        return this.http.doPost(Constants.APIPATH + 'admin/add-blog',
            data, false);
    }

    checkBlogName(blogName) {
        return this.http.doGet(Constants.APIPATH + 'admin/check-blog-name/' + blogName, false);
    }

}
