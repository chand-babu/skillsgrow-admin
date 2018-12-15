import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Constants } from './../../../common/constant';
import { HttpUtil } from './../../../common/http.util';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()


export class BannerImagesProxy {

    constructor(public http: HttpUtil, public mannualHttp: HttpClient) {}

    bannerImages(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/banner-images', data, false);
    }

    uploadImageCategory(data) {
        return this.http.doPost(Constants.APIPATH + 'admin/upload',
            data, false);
    }

    bannerImagesLists() {
        return this.http.doGet(Constants.APIPATH + 'admin/list-banner-images');
    }

    deleteBannerImagesLists(id) {
        return this.http.doDelete(Constants.APIPATH + 'admin/banner-images/' + id);
    }

    getBannerImagesDetails(id) {
        return this.http.doGet(Constants.APIPATH + 'admin/banner-images/' + id);
    }

    activeAndInactive(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/update-bannerImages', data, false);
    }

    updateBannerImage(data) {
        return this.http.doPut(Constants.APIPATH + 'admin/update-images', data, false);
    }

}
