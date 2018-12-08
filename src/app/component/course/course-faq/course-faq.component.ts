import { Component, OnInit } from '@angular/core';
import { Global } from '../../../../common/global';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../common/data.service';
import { CourseFaqProxy } from './course-faq.proxy';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-faq.component.html',
  providers: [CourseFaqProxy]
})
export class CourseFaqComponent implements OnInit {
  public courseListData: any;
  public courseId: any;
  public courseFaqObj = {
    courseId: '',
    question: '',
    answer: ''
  }
  public faqQuestions = [];
  public currentCourseData: any;

  constructor(public global: Global, public activateRoute: ActivatedRoute,
    public dataService: DataService, public courseFaqProxy: CourseFaqProxy) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe((courseData) => {
      this.currentCourseData = courseData;
      if (this.currentCourseData !== 'false') {
        if (this.currentCourseData.faq.length >= 1) {
          this.faqQuestions = this.currentCourseData.faq;
        }
      } else {
        this.global.navigateToNewPage('/course/list');
      }
    });
    this.activateRoute.params.forEach(params => {
      this.courseId = params['id'];
      this.courseFaqObj.courseId = this.courseId;
  });
  }

  submitCourseFaqForm() {
    this.faqQuestions.push({
      question : this.courseFaqObj.question,
      answer: this.courseFaqObj.answer
    });
    this.courseFaqProxy.courseFaqService({courseId: this.courseFaqObj.courseId, faq: this.faqQuestions})
    .subscribe((success: any) => {
      console.log(success);
    });
  }

  deleteFaq(index) {
    this.faqQuestions.splice(index, 1);
    this.courseFaqProxy.courseFaqDeleteService({courseId: this.courseFaqObj.courseId, faq: this.faqQuestions})
    .subscribe((success: any) => {
      console.log(success);
    });
  }

}
