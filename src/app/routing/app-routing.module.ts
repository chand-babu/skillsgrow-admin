import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, DashboardComponent,
  CourseDashboardComponent, CourseCategoriesComponent,
  CourseCreateComponent, CourseExamComponent, CourseListComponent,
  CourseDetailsComponent, CourseTimelineComponent, CourseLearningComponent,
  CourseTestComponent, CourseConfirmationComponent, BannerImagesComponent, CourseFaqComponent,
  AddSSPComponent, UserComponent, UserDashboardComponent, UserListingComponent} from './../component/all';
import { LoginGuard } from '../component/guard/login.guard';
import { StepsGuard } from '../component/guard/steps.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
  { path: 'course/dashboard', component: CourseDashboardComponent, canActivate: [LoginGuard]},
  { path: 'course/categories', component: CourseCategoriesComponent, canActivate: [LoginGuard]},
  { path: 'course/faq/:id', component: CourseFaqComponent, canActivate: [LoginGuard]},
  { path: 'course/addssp', component: AddSSPComponent, canActivate: [LoginGuard]},
  { path: 'course/create',
    component: CourseCreateComponent,
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full'},
      { path: 'details', component: CourseDetailsComponent, canActivate: [LoginGuard]},
      { path: 'timeline', component: CourseTimelineComponent, canActivate: [LoginGuard, StepsGuard]},
      { path: 'learning', component: CourseLearningComponent, canActivate: [LoginGuard, StepsGuard]},
      { path: 'test', component: CourseTestComponent, canActivate: [LoginGuard, StepsGuard]},
      { path: 'confirmation', component: CourseConfirmationComponent, canActivate: [LoginGuard, StepsGuard]}
    ]
  },
  { path: 'course/list', component: CourseListComponent, canActivate: [LoginGuard]},
  { path: 'course/exam/:parentIndex/:childIndex', component: CourseExamComponent, canActivate: [LoginGuard]},
  { path: 'bannerimages', component: BannerImagesComponent, canActivate: [LoginGuard]},
  {
    path: 'user',
    component: UserComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'user/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: UserDashboardComponent,
      },
      {
        path: 'list',
        component: UserListingComponent
      }
    ]
  },
  /* If URL does not match any path redirec to login Page */
  { path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
