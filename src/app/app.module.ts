import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { DataTableModule } from 'primeng/datatable';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { GrowlModule } from 'primeng/growl';
import { EditorModule } from 'primeng/editor';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { StoreModule } from '@ngrx/store';
import { LocalStorageModule } from 'angular-2-local-storage';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgProgressModule } from 'ngx-progressbar';

import { Global } from './../common/global';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { LoginComponent, DashboardComponent, CourseCategoriesComponent,
  CourseDashboardComponent, CourseListComponent, CourseCreateComponent,
  CourseExamComponent, NavigationComponent, BannerImagesComponent, CourseFaqComponent,
  AddSSPComponent, UserComponent, UserListingComponent, UserDashboardComponent,
  RollsPermissionsComponent, SubAdminComponent, CompanyComponent,
  CompanyDashboardComponent, CompanyListComponent, ListInternshipComponent,
  ListAppliedInternshipComponent } from './component/all';
import { CourseDetailsComponent } from './component/course/course-create/course-details/course-details.component';
import { CourseTimelineComponent } from './component/course/course-create/course-timeline/course-timeline.component';
import { CourseLearningComponent } from './component/course/course-create/course-learning/course-learning.component';
import { CourseTestComponent } from './component/course/course-create/course-test/course-test.component';
import { CourseConfirmationComponent } from './component/course/course-create/course-confirmation/course-confirmation.component';
import { HttpUtil } from './../common/http.util';
import { LoginGuard } from './component/guard/login.guard';
import { LoginService } from './component/guard/login.service';
import { MessageConfirm } from '../common/message';
import { ConfirmationService } from 'primeng/api';
import { StepsGuard } from './component/guard/steps.guard';
import { TableModule } from 'primeng/table';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DataService } from '../common/data.service';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CourseCategoriesComponent,
    CourseDashboardComponent,
    CourseListComponent,
    CourseCreateComponent,
    CourseExamComponent,
    NavigationComponent,
    CourseDetailsComponent,
    CourseTimelineComponent,
    CourseLearningComponent,
    CourseTestComponent,
    CourseConfirmationComponent,
    BannerImagesComponent,
    CourseFaqComponent,
    AddSSPComponent,
    UserComponent,
    UserListingComponent,
    UserDashboardComponent,
    RollsPermissionsComponent,
    SubAdminComponent,
    CompanyComponent,
    CompanyDashboardComponent,
    CompanyListComponent,
    ListInternshipComponent,
    ListAppliedInternshipComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: '',
      storageType: 'localStorage'
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    DeviceDetectorModule.forRoot(),
    MenubarModule, CardModule, ChartModule, PanelModule, DataTableModule, DialogModule,
    DropdownModule, StepsModule, EditorModule, AccordionModule, SidebarModule,
    ConfirmDialogModule, TableModule, GrowlModule, NgHttpLoaderModule, TooltipModule,
    FieldsetModule, CheckboxModule, NgProgressModule
  ],
  providers: [
    Global,
    HttpUtil,
    LoginGuard,
    StepsGuard,
    LoginService,
    ConfirmationService,
    MessageConfirm,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
