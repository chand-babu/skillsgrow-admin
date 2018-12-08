import { Component, OnInit } from '@angular/core';
import { Global } from '../../../../../common/global';
import { CourseCreateComponent } from './../course-create.component';

@Component({
  selector: 'app-course-timeline',
  templateUrl: './course-timeline.component.html'
})

export class CourseTimelineComponent implements OnInit {
  textvalue = [{
    title: '',
    topics: [],
    order: null
  }];

  topicData = [{
    subTopics: null,
    timing: '',
    order: null
  }];

  public timelineArrayOfData = [];
  public count = 0;
  subTopics = [];
  timing = [];
  chapterDetails = [
    {
      title: '',
      topics: [],
      order: null
    }
  ]
  public showSaveAndContinueBtn: boolean = false;

  constructor(public global: Global, public course: CourseCreateComponent) { }

  ngOnInit() {
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      if (success.timeline) {
        this.chapterDetails = success.timeline;
        this.showSaveAndContinueBtn = true;
      }
    });
  }

  onSubmit() {
    if (this.chapterDetails[0].title === '') {
      this.chapterDetails = [];
    }
    this.textvalue[this.timelineArrayOfData.length].order = this.chapterDetails.length;
    this.textvalue.push({title: '', topics: [], order: ''});
    this.timelineArrayOfData.push(this.textvalue[this.timelineArrayOfData.length]);
    this.chapterDetails.push(this.timelineArrayOfData[this.timelineArrayOfData.length-1]);
    console.log(this.chapterDetails);
  }

  addNewTopic(index) {
    this.showSaveAndContinueBtn = true;
    console.log(index);
    this.topicData[this.count].subTopics = this.subTopics[index];
    this.topicData[this.count].timing = this.timing[index];
    this.topicData[this.count].order = this.chapterDetails[index].topics.length;
    console.log(this.topicData);
    this.chapterDetails[index].topics.push(this.topicData[this.count]);
    this.topicData.push({subTopics: '', timing: '', order: ''});
    this.count = this.count + 1;
    this.subTopics = [];
    this.timing = [];
    console.log(this.chapterDetails);
  }

  continue() {
    this.course.items[2].command();
    this.course.items[0].disabled = false;
    this.course.items[1].disabled = false;
    this.course.items[2].disabled = false;
    this.course.items[0].routerLink = '/course/create/details';
    this.course.items[1].routerLink = '/course/create/timeline';
    this.course.items[2].routerLink = '/course/create/learning';
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      const timeline = success;
      timeline.timeline = this.chapterDetails;
      this.global.storeBulkData('courseData', timeline).subscribe(() => {
        this.global.navigateToNewPage('/course/create/learning');
      });
    });
  }

  deleteTopics(i,j) {
    this.chapterDetails[i].topics.splice(j, 1);
  }

  chapterDelete(index) {
    this.chapterDetails.splice(index,1);
    if (this.chapterDetails.length === 0) {
      this.chapterDetails.push({
        title: '',
        topics: [],
        order: null
      });
    }
  }

}
