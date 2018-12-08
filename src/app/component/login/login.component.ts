import { Component, OnInit } from '@angular/core';
import { LoginProxy } from './login.proxy';
import { Global } from './../../../common/global';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { LoginService } from '../guard/login.service';
import { MessageConfirm } from '../../../common/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginProxy]
})
export class LoginComponent implements OnInit {
  public navigationStatus: boolean = false;
  public alertTrue: Boolean;
  public confirmTrue: Boolean;
  public userId: any;

  public formData = {
    emailId: '',
    password: ''
  };
  public chrome: any;
  public edge: any;
  public firefox: any;
  public opera: any;
  public deviceInfo = null;

  public browserDetails = {
        userId: '',
        ip: '',
        browser: '',
        userType: ''
  };

  constructor(public global: Global, public loginproxy: LoginProxy,
    private deviceService: DeviceDetectorService, private router: Router,
  private loginservice: LoginService, public message: MessageConfirm) {
  }

  ngOnInit() {
    console.log(!!this.global.getStorageDetail('token'));
    if (!!this.global.getStorageDetail('token')) {
        this.navigationStatus = false;
        this.global.navigateToNewPage('/dashboard');
      }
    this.clientIp();
    this.chrome = /msie\s|trident\/|Chrome\//i.test(window.navigator.userAgent);
    this.edge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    this.firefox = /msie\s|trident\/|Firefox\//i.test(window.navigator.userAgent);
    this.opera = /msie\s|trident\/|opera\//i.test(window.navigator.userAgent);
    console.log(this.chrome, this.edge, this.firefox, this.opera);
  }

  onSubmit() {
    this.loginproxy.adminLogin(this.formData)
    .subscribe((success) => {
      console.log(success);
      if (success.result === false) {
        this.alertTrue = true;
        this.confirmTrue = false;
        this.message.alert('username and password is Invalid');
      } else {
        this.global.storeDataLocal('userId', success.data);
        this.browserDetails.userId = success.data._id;
        this.adminGenerateToken();
        // this.router.navigate(['/dashboard']);
      }
    });
  }

  clientIp() {
    this.loginproxy.browserDetails()
    .subscribe((success: any) => {
      console.log(success);
      this.browserDetails.ip = success.ip;
    });
  }

  adminGenerateToken() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.browserDetails.browser = this.deviceInfo.browser;
    this.browserDetails.userType = '0';
    console.log(this.browserDetails);
    this.loginproxy.adminToken(this.browserDetails)
    .subscribe((success) => {
      console.log(success);
      if (success.token) {
          this.loginservice.login(this.formData);
          this.global.storeDataLocal('token', success);
      } else {
        if (success.data[0].tokenId) {
          this.alertTrue = false;
          this.confirmTrue = true;
          this.message.confirm('You are already logged in some other device. ' +
            'If you want to login in this device, you have to logout from other ' +
            'device. Click OK to logout from other device');
        } else {
          // alert('first time login');
          this.loginservice.login(this.formData);
          this.global.storeDataLocal('token', success);
        }
      }
    });
  }

  destroyToken() {
    this.userId = this.global.getStorageDetail('userId')._id;
      console.log(this.userId);
    this.loginproxy.TokenDestroy(this.userId)
    .subscribe((success) => {
      console.log(success);
      this.onSubmit();
      // this.global.clearLocalStorage();
    });
  }

}
