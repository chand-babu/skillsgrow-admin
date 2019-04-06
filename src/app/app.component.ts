import { Component, OnInit, isDevMode, AfterViewInit } from '@angular/core';
import { RouterEvent, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Global } from './../common/global';
import { Spinkit } from 'ng-http-loader';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  template: `
    <app-navigation *ngIf="navigationStatus"></app-navigation>
    <ng-http-loader 
      [backgroundColor]="'#ff0000'"
      [spinner]="spinkit.skWave"
      [debounceDelay]="100"
      [minDuration]="300">
    </ng-http-loader>
    <ng-progress [positionUsing]="'marginLeft'" [minimum]="0.15" [maximum]="1" [speed]="2000" [showSpinner]="false"
    [color]="'blue'" [trickleSpeed]="2000" [thick]="true" [ease]="'linear'"></ng-progress>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit,AfterViewInit{
  public spinkit = Spinkit;
  loader: boolean;
  navigationStatus: boolean = false;
  developerMode: boolean;

  constructor(public ngProgress: NgProgress, private router: Router, public global: Global) {
    console.log(isDevMode());

    this.router.events.subscribe((routeEvent: RouterEvent) => {
      // console.log(this.router.url.split('?')[1] === 'dev=true');
      if (this.router.url.split('?')[1] === 'dev=true') {
        this.developerMode = true;
        this.global.storeDataLocal('develop', this.developerMode);
      } else if (this.router.url.split('?')[1] === 'dev=false') {
        this.developerMode = false;
        this.global.deleteLocalData('develop');
      }
      if (this.router.url === '/login' || this.router.url === '/login?dev=true') {
        this.navigationStatus = false;
      } else {
        this.navigationStatus = true;
      }

      if (routeEvent instanceof NavigationStart) {
        this.loader = true;
        this.ngProgress.start();
      }

      if (routeEvent instanceof NavigationEnd ||
        routeEvent instanceof NavigationCancel || routeEvent instanceof NavigationError) {
        this.loader = false;
        this.ngProgress.done();
      }
    });
  }

  ngAfterViewInit() {
    // this.router.events.subscribe((routeEvent: RouterEvent) => {
    //   console.log("++++++++++++++++++++", this.router.url)
    //   // console.log(this.router.url.split('?')[1] === 'dev=true');
    //   if (this.router.url.split('?')[1] === 'dev=true') {
    //     this.developerMode = true;
    //     this.global.storeDataLocal('develop', this.developerMode);
    //   } else if (this.router.url.split('?')[1] === 'dev=false') {
    //     this.developerMode = false;
    //     this.global.deleteLocalData('develop');
    //   }
    //   if (this.router.url === '/login' || this.router.url === '/login?dev=true') {
    //     this.navigationStatus = false;
    //   } else {
    //     this.navigationStatus = true;
    //   }

    //   if (routeEvent instanceof NavigationStart) {
    //     this.loader = true;
    //     this.ngProgress.start();
    //   }

    //   if (routeEvent instanceof NavigationEnd ||
    //     routeEvent instanceof NavigationCancel || routeEvent instanceof NavigationError) {
    //     this.loader = false;
    //     this.ngProgress.done();
    //   }
    // });
  }

  ngOnInit() {

  }
}
