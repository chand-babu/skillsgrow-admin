import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Global } from './../../../common/global';
import { LoginProxy } from '../login/login.proxy';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageConfirm } from '../../../common/message';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    providers: [LoginProxy]
})
export class NavigationComponent implements OnInit {
    items: MenuItem[];
    public userId: any;
    constructor(public global: Global, public loginproxy: LoginProxy,
    public message: MessageConfirm) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                routerLink: 'dashboard'
            },
            {
                label: 'Course Management',
                routerLink: 'course',
                items: [
                    { label: 'Dashboard', routerLink: 'course/dashboard' },
                    { label: 'Manage Categories', routerLink: 'course/categories' },
                    { label: 'Course List', routerLink: 'course/list' },
                    { label: 'Create New Course', routerLink: 'course/create' },
                    { label: 'Add SSP', routerLink: 'course/addssp' }
                ]
            },
            {
                label: 'CMS',
                routerLink: 'cms/dashboard',
                items: [
                    { label: 'Manage Banners', routerLink: 'bannerimages' },
                ]
            },
            {
                label: 'User Management',
                routerLink: 'user/dashboard',
                items: [
                    { label: 'Dashboard', routerLink: 'user/dashboard' },
                    { label: 'User Lists', routerLink: 'user/list' }
                ]
            }
        ];
    }

    logout() {
        this.userId = this.global.getStorageDetail('userId')._id;
        this.loginproxy.TokenDestroy(this.userId)
            .subscribe((success) => {
            console.log(success);
            this.global.clearLocalStorage();
            this.global.navigateToNewPage('/login');
        });
    }

}
