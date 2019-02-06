import { Component, OnInit } from '@angular/core';
import { CourseListProxy } from './course-list.proxy';
import { Global } from '../../../../common/global';
import { Router } from '@angular/router';
import { DataService } from '../../../../common/data.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers: [CourseListProxy]
})
export class CourseListComponent implements OnInit {
  public courseListData: any;
  message: any;

  constructor(public courseListProxy: CourseListProxy, public global: Global,
    public router: Router, public dataService: DataService,
    public messageConfirm: ConfirmationService) { }

  ngOnInit() {
    this.global.storeDataLocal('courseDataStatus', false);
    this.courseList();
  }

  courseList() {
    this.global.removeBulkData('courseData');
    this.courseListProxy.CategoryListData()
      .subscribe((success: any) => {
        this.courseListData = success.data;
      });
  }

  courseEdit(data) {
    data.update = true;
    this.global.storeBulkData('courseData', data).subscribe(() => {
      this.global.storeDataLocal('courseDataStatus', true);
      this.global.navigateToNewPage('/course/create/details');
    });
  }

  addCourseFaq(id, courseData) {
    this.dataService.changeMessage(courseData);
    this.router.navigate(['/course/faq', id]);
  }

  changeCourseStatus(id, active) {
    (active === true) ? active = false : active = true;
    console.log(active);
    this.courseListProxy.activeAndInactive({ _id: id, active: active })
      .subscribe((success: any) => {
        console.log(success);
        this.courseList();
      });
  }

  deleteCourse(id) {
    this.messageConfirm.confirm({
      message: 'Are you sure that you want to this course?',
      accept: () => {
        this.courseListProxy.courseDelete(id)
          .subscribe((success: any) => {
            console.log(success);
            this.courseList();
          });
      }
    });
  }

  viewTrendingCourse(id,viewTrending){
    let viewStatus = viewTrending == undefined || viewTrending == false ? true:false;
    console.log(id, viewTrending, viewStatus);
    let data = {
      id: id, 
      viewTrending : viewStatus
    }
    this.courseListProxy.trendingCourseView(data)
      .subscribe((success: any) => {
        if(success.status){
          alert('Only 6 You can display');
        }else{
          console.log(success);
        }
        this.courseList();
      });
  }

}
