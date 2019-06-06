import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Global } from './../../../common/global';
import { LoginProxy } from '../login/login.proxy';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MessageConfirm } from '../../../common/message';
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    providers: [LoginProxy]
})
export class NavigationComponent implements OnInit {
    items: MenuItem[];
    public userId: any;
    public user = {
        pwd: '',
        newpwd: '',
        confirmpwd: ''
    };
    public openChangePwdBoxStatus: boolean = false;
    constructor(public route: Router, public global: Global, public loginproxy: LoginProxy,
        public message: MessageConfirm, private storage: LocalStorage) { }

    ngOnInit() {
        let menu = [
            {
                label: 'Dashboard',
                routerLink: 'dashboard',
                code: 123
            },
            {
                label: 'Course Management',
                routerLink: 'course',
                code: 124,
                items: [
                    { label: 'Dashboard', routerLink: 'course/dashboard', code: 101 },
                    { label: 'Manage Categories', routerLink: 'course/categories', code: 102 },
                    { label: 'Course List', routerLink: 'course/list', code: 103 },
                    {
                        label: 'Create New Course', routerLink: 'course/create', code: 104, command: (event: any) => {
                            // this.global.removeBulkData('courseData');
                            this.global.getBulkData('courseData')
                                .subscribe((success: any) => {
                                    const courseData = success;
                                    if (courseData) {
                                        this.storage.removeItem('courseData').subscribe((success: any) => {
                                            this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                                this.route.navigate(["/course/create"]));
                                        });
                                    } else {
                                        this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                                            this.route.navigate(["/course/create"]));
                                    }
                                });
                        }
                    },
                    { label: 'Add SSP', routerLink: 'course/addssp', code: 127 }
                ]
            },
            {
                label: 'CMS',
                routerLink: 'cms/dashboard',
                code: 125,
                items: [
                    { label: 'Manage Banners', routerLink: 'bannerimages', code: 105 },
                ]
            },
            {
                label: 'User Management',
                routerLink: 'user/dashboard',
                code: 126,
                items: [
                    { label: 'Dashboard', routerLink: 'user/dashboard', code: 106 },
                    { label: 'User Lists', routerLink: 'user/list', code: 107 },
                    { label: 'Rolls and permissions', routerLink: 'user/rolls-permissions', code: 108 },
                    { label: 'Sub Admin', routerLink: 'user/sub-admin', code: 109 }
                ]
            }, {
                label: 'Company Intern',
                routerLink: 'company/dashboard',
                code: 142,
                items: [
                    { label: 'Dashboard', routerLink: 'company/dashboard', code: 143 },
                    { label: 'Company Lists', routerLink: 'company/list', code: 144 }
                ]
            }, {
                label: 'Blog Management',
                routerLink: 'blog',
                code: 145,
                items: [
                    { label: 'Blog List', routerLink: 'blog/list', code: 146 },
                    {
                        label: 'Create New Blog', routerLink: 'blog/create', code: 147
                    },
                    { label: 'Blog Comment List', routerLink: 'blog/comment/list', code: 148 },
                ]
            }
        ];

        let accessAllowed = menu.filter((permissionsItems) => {
            if (this.global.checkRollsAndPermission(permissionsItems.code)) {
                delete permissionsItems.code;
                if (permissionsItems.items != undefined) {
                    if (permissionsItems.items.length != 0) {
                        let per = permissionsItems.items.filter((items) => {
                            if (this.global.checkRollsAndPermission(items.code)) {
                                delete items.code;
                                return true;
                            } else {
                                return false;
                            }
                        });
                        permissionsItems.items = per;
                    }
                }
                return true;
            } else {
                return false;
            }
        });
        this.items = accessAllowed;
    }

    openChangePwdBox() {
        this.openChangePwdBoxStatus = true;
    }

    adminChangePwd() {
        if (this.user.newpwd !== this.user.confirmpwd) {
            alert('Please check Confirm Password');
        } else {
            let data = {
                id: this.global.getStorageDetail('userId')._id,
                pwd: this.user.pwd,
                newpwd: this.user.newpwd
            };
            console.log(data);
            this.loginproxy.adminChangePwd(data)
                .subscribe((success: any) => {
                    if (success.result) {
                        this.openChangePwdBoxStatus = false;
                        alert('Your Password has been changed');
                        console.log(success);
                    } else {
                        alert('Old Password Not Matched');
                        console.log(success);
                    }
                })
        }
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
