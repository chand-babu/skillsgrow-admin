import { Component, OnInit, isDevMode } from '@angular/core';
import { RouterEvent, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Global } from './../common/global';
import { Spinkit } from 'ng-http-loader';

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
    <div *ngIf="loader" class="loader-container">
      <div class="lds-circle"></div>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  public spinkit = Spinkit;
  loader: boolean;
  navigationStatus: boolean = true;
  developerMode: boolean;

  constructor(private router: Router,  public global: Global) {
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
      }

      if (routeEvent instanceof NavigationEnd ||
        routeEvent instanceof NavigationCancel || routeEvent instanceof NavigationError) {
        this.loader = false;
      }
    });
  }

  ngOnInit() {
    
  }
}
