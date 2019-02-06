import { Component, OnInit } from '@angular/core';
import { Global } from '../../../../common/global';
import { Router } from '@angular/router';
import { AddSSPProxy } from './add-ssp.proxy';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-course-list',
    templateUrl: './add-ssp.component.html',
    styleUrls: ['./add-ssp.component.css'],
    providers: [AddSSPProxy]
})
export class AddSSPComponent implements OnInit {
    public addSSPObj: any = {
        userName: '',
        emailId: '',
        password: 'skillsgrow123',
        phone: '',
        collegeId: '',
        collegeName: '',
        loginStatus: 0,
        status: 3
    };
    public message: any;
    public successMessage: boolean = false;
    public showSSPMembers: boolean = false;
    public SSPMembers: any;
    public updateSSPMembers: boolean = false;

    constructor(public global: Global,
        public router: Router, public addsspProxy: AddSSPProxy,
        public messageConfirm: ConfirmationService) { }

    ngOnInit() {
        this.getSSPMembers();
        this.rollsPermissions();
    }

    viewSSPMembers() {
        // this.getSSPMembers();
        this.successMessage = false;
        this.rollsPermissions();
    }

    rollsPermissions(){
        if(this.global.checkRollsAndPermission(131) && this.global.checkRollsAndPermission(133)) {
            (this.showSSPMembers) ? this.showSSPMembers = false : this.showSSPMembers = true;
        }else if(this.global.checkRollsAndPermission(131)){
            this.showSSPMembers = false;
        }else if(this.global.checkRollsAndPermission(133)){
            this.showSSPMembers = true;
        } 
    }

    getSSPMembers() {
        this.addsspProxy.getSSP()
            .subscribe((success: any) => {
                this.SSPMembers = success.data;
                console.log(this.SSPMembers);
                this.SSPMembers.filter((data) => {
                    data.createdOn = data.createdOn.split('T')[0];
                });
            });
    }

    editSSPMembers(data) {
        this.updateSSPMembers = true;
        this.addSSPObj = data;
        this.viewSSPMembers();
    }

    deleteSSPMembers(id) {
        this.messageConfirm.confirm({
            message: 'Are you sure that you want to delete this SSP member?',
            accept: () => {
                this.addsspProxy.deleteSSP(id)
                    .subscribe((success: any) => {
                        this.getSSPMembers();
                    });
            }
        });
    }

    emailExistOrNot(email) {
        this.addsspProxy.checkEmail(email)
        .subscribe((success: any) => {
            if (success.result) {
                this.updateSSPMembers = true;
                this.addSSPObj._id = success._id;
            }
        });
    }

    onSubmit() {
        if (this.updateSSPMembers) {
            delete this.addSSPObj.password;
            delete this. addSSPObj.loginStatus;
            this.addsspProxy.updateSSP((this.addSSPObj))
                .subscribe((success: any) => {
                    if (success.result) {
                        this.message = 'Done successfully';
                        this.successMessage = true;
                        this.updateSSPMembers = false;
                        delete this.addSSPObj._id;
                    }
                });
        } else {
            this.addSSPObj.password = 'skillsgrow123';
            this. addSSPObj.loginStatus = 0;
            this.addsspProxy.addSSP(this.addSSPObj)
                .subscribe((success: any) => {
                    if (success.result) {
                        this.message = 'SSP added successfully';
                        this.successMessage = true;
                    } else {
                        this.successMessage = false;
                        this.message = 'Something went wrong';
                    }
                });
        }
        setTimeout(() => {
            this.message = '';
        }, 2000);
    }

}
