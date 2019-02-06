import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class Global {
    public permission : any;
    public status: any;
    public removeRepeat: any;
    constructor(private localStorage: LocalStorageService, 
        private route: Router, private storage: LocalStorage) {
            this.execute();
    }
    /*
     * store  data into local storage.
     */
    public storeDataLocal(key: string, data: any): void {
        this.localStorage.add(key, data);
    }

    /*
     * get local storage data details.
     */
    public getStorageDetail(key: string): any {
        return this.localStorage.get(key);
    }

    /*
     * delete local storage data.
     */
    public deleteLocalData(key: string): void {
        this.localStorage.remove(key);
    }

    /* clear local storage data */
    public clearLocalStorage(): void {
        this.localStorage.clearAll();
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
            console.log(success);
        });
    }

    public destroySession(): void {
        this.storage.clear().subscribe();
    }

    public getBulkData(key: string): Observable<any> {
        return this.storage.getItem(key);
    }

    public execute() {
        if(this.getStorageDetail('userId') != null){
            this.permission = this.getStorageDetail('userId').rollsPermission;
            this.status = this.getStorageDetail('userId').status;
            this.removeRepeat = this.checkRollsPermissionLoop();
        }
    }
    
    public checkRollsPermissionLoop() {
        let rollsPermissionValues = [];
        let rollsPermissionSet = this.permission;
        if(rollsPermissionSet.length != 0){
            rollsPermissionSet.filter((items) => {
                rollsPermissionValues = rollsPermissionValues.concat(items.permissions);
            });
            return Array.from(new Set(rollsPermissionValues).values());
        }else{
            return [];
        }
    }
    
    public checkRollsAndPermission(value): any {
        if(this.status == 0){
            return true;
        }else{
            return this.removeRepeat.includes(value);
        }
        
    }

}

