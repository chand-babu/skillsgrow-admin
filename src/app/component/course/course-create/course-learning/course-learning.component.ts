import { Component, OnInit } from '@angular/core';
import { Global } from '../../../../../common/global';
import { Constants } from '../../../../../common/constant';
import { CourseCreateComponent } from './../course-create.component';
import { CourseDetailsProxy } from '../course-details/course-details.proxy';


@Component({
  selector: 'app-course-learning',
  templateUrl: './course-learning.component.html',
  providers: [CourseDetailsProxy]
})
export class CourseLearningComponent implements OnInit {
  public imagePath = Constants.IMAGEPATH;
  display: boolean = false;
  content: string = '';
  public learningDetails: any;
  public courseContent = [];
  public counter = 0;
  public i = 0;
  public j = 0;
  sample = [
    {
      title: '',
      topics: [{
        description: '',
        order: '',
        subTopics: '',
        timing: ''
      }],
      order: ''
    }
  ];
  editor: any;
  _returnedURL: any;
 

  constructor(public global: Global, public course: CourseCreateComponent,
  public courseDetailsProxy: CourseDetailsProxy) {}

  ngOnInit() {
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      this.learningDetails = success.timeline;
      this.sample = this.learningDetails;
    });
  }

  courseDetails() {
    this.display = false;
    console.log(this.courseContent);
    console.log(this.i, this.j);
    //this.learningDetails[this.i].topics[this.j].description = this.courseContent[this.counter];
    //this.counter = this.counter + 1;
    console.log(this.sample);
  }

  textEditor(i: any, j: any) {
    this.display = true;
    console.log(i, j);
    this.i = i;
    this.j = j;
  }

  editorInit(quill) {
    const qul = quill.editor;
    const toolbar = qul.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = qul;
  }


imageHandler() {
  const Imageinput = document.createElement('input');
  Imageinput.setAttribute('type', 'file');
  Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
  Imageinput.classList.add('ql-image');
  Imageinput.addEventListener('change', () =>  {
    const file = Imageinput.files[0];
    console.log(file);
    if (Imageinput.files != null && Imageinput.files[0] != null) {
      const formData = new FormData();
          formData.append('image', file);
        this.courseDetailsProxy.uploadImageCategory(formData).subscribe((res: any) => {
        this._returnedURL = res.filename;
        console.log(this._returnedURL);
        this.pushImageToEditor();
        });
    }
});

  Imageinput.click();
}

pushImageToEditor() {
  const range = this.editor.getSelection(true);
  const index = range.index + range.length;
  this.editor.insertEmbed(range.index, 'image', this.imagePath+this._returnedURL);
}

  saveAndContinue() {
    console.log(this.learningDetails);
    this.course.items[3].command();
    this.course.items[0].disabled = false;
    this.course.items[1].disabled = false;
    this.course.items[2].disabled = false;
    this.course.items[3].disabled = false;
    this.course.items[0].routerLink = '/course/create/details';
    this.course.items[1].routerLink = '/course/create/timeline';
    this.course.items[2].routerLink = '/course/create/learning';
    this.course.items[3].routerLink = '/course/create/test';
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      const learning = success;
      learning.timeline = this.sample;
      this.global.storeBulkData('courseData', learning).subscribe(() => {
        this.global.navigateToNewPage('/course/create/test');
      });
    });
  }

}
