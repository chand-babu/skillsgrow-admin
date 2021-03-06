import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import * as StorageShim from 'node-storage-shim';

@Injectable()
export class Global {
    public permission: any;
    public status: any;
    public removeRepeat: any;
     public serverLocalStorage = new StorageShim();
    constructor(private localStorage: LocalStorageService,
        private route: Router, private storage: LocalStorage, @Inject(PLATFORM_ID) private platformId: Object) {
        this.execute();
    }
    /*
     * store  data into local storage.
     */
    public storeDataLocal(key: string, data: any): void {
        if (isPlatformBrowser(this.platformId)) {
            // this.localStorage.add(key, data);
            localStorage.setItem(key, JSON.stringify(data));
        }
        if (isPlatformServer(this.platformId)) {
            this.serverLocalStorage.setItem(key, JSON.stringify(data));
        }
    }

    /*
     * get local storage data details.
     */
    public getStorageDetail(key: string): any {
        if (isPlatformBrowser(this.platformId)) {
            // return this.localStorage.get(key);
            return JSON.parse(localStorage.getItem(key));
        }
        if (isPlatformServer(this.platformId)) {
            return JSON.parse(this.serverLocalStorage.getItem(key));
        }
    }

    /*
     * delete local storage data.
     */
    public deleteLocalData(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            // this.localStorage.remove(key);
            localStorage.removeItem(key);
        }
        if (isPlatformServer(this.platformId)) {
            this.serverLocalStorage.removeItem(key);
        }
    }

    /* clear local storage data */
    public clearLocalStorage(): void {
        if (isPlatformBrowser(this.platformId)) {
            // this.localStorage.clearAll();
            localStorage.clear();
        }
        if (isPlatformServer(this.platformId)) {
            this.serverLocalStorage.clear();
        }
    }

    /*
     * will be used to navigate to different pages. without parameter
     */
    public navigateToNewPage(path: string): void {
        this.route.navigateByUrl(path).then(response => console.log(response)).catch(error => console.log(error));
    }

    public sessionAuthenticationFailed(): void {
        /*this.deleteLocalData(Constants.LOGINSESSION);*/
        this.navigateToNewPage('/login');
    }

    public storeBulkData(key: string, data: any): Observable<any> {
        return this.storage.setItem(key, data);
    }

    public removeBulkData(key: string): void {
        this.storage.removeItem(key).subscribe((success: any) => {
            console.log('()', success, '(key)', key);
        });
    }

    public destroySession(): void {
        this.storage.clear().subscribe();
    }

    public getBulkData(key: string): Observable<any> {
        return this.storage.getItem(key);
    }

    public execute() {
        if (this.getStorageDetail('userId') != null) {
            this.permission = this.getStorageDetail('userId').rollsPermission;
            this.status = this.getStorageDetail('userId').status;
            this.removeRepeat = this.checkRollsPermissionLoop();
        }
    }

    public checkRollsPermissionLoop() {
        let rollsPermissionValues = [];
        let rollsPermissionSet = this.permission;
        if (rollsPermissionSet.length != 0) {
            rollsPermissionSet.filter((items) => {
                rollsPermissionValues = rollsPermissionValues.concat(items.permissions);
            });
            return Array.from(new Set(rollsPermissionValues).values());
        } else {
            return [];
        }
    }

    public checkRollsAndPermission(value): any {
        // if (isPlatformBrowser(this.platformId)) {
            if (this.status == 0) {
                return true;
            } else {
                return this.removeRepeat.includes(value);
            }
        // }
    }

}

