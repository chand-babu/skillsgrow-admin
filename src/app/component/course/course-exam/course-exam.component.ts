import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from '../../../../common/global';
import { MessageConfirm } from '../../../../common/message';
import { CourseCategoryProxy } from '../course-categories/course-categories.proxy';

@Component({
  selector: 'app-course-exam',
  templateUrl: './course-exam.component.html',
  styleUrls: ['./course-exam.component.css'],
  providers: [CourseCategoryProxy]
})
export class CourseExamComponent implements OnInit {
  public questionsFormobj = {
    questionStatus: '',
    question: '',
    passage: '',
    options: [],
    time: '',
    imageQuestion: '',
    passageTitle: '',
    instruction: '',
    answer: '',
  };

  public imageQuestionvalidation = '';

  public optionArray = [];
  public passageTextBox: boolean = false;
  public imageTextBox: boolean = false;
  public imageText: boolean = false;
  public parentIndex: any;
  public childIndex: any;
  public questionsArray = [];
  public file: any;
  public img: any;
  public categoryImage: any;
  public passageQuestions = [];
  public getQuestionFromLocalStorage: any;
  public courseData: any;
  public displayInstructionAndTitle: boolean = false;
  public formateErr: boolean = false;

  // image height and width
  public size: any;
  public width: number;
  public height: number;

  constructor(public activateRoute: ActivatedRoute, public global: Global,
    private message: MessageConfirm, public courseCategoriesproxy: CourseCategoryProxy) { }

  ngOnInit() {
    this.activateRoute.params.forEach(params => {
      this.parentIndex = params['parentIndex'];
      this.childIndex = params['childIndex'];
    });
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      this.courseData = success;
      const getQuestionFromLocalStorage = this.courseData.timeline[this.parentIndex].topics[this.childIndex].questions;
      if (getQuestionFromLocalStorage) {
        this.questionsArray = getQuestionFromLocalStorage;
      }
    });
  }

  onSubmit() {
    this.questionsFormobj.options = this.optionArray;
    this.optionArray = [];
    this.questionsArray.push({
      questionStatus: this.questionsFormobj.questionStatus,
      question: (this.questionsFormobj.questionStatus === '1') ? this.passageQuestions : this.questionsFormobj.question,
      options: this.questionsFormobj.options,
      passage: this.questionsFormobj.passage,
      passageTitle: this.questionsFormobj.passageTitle,
      imageQuestion: this.questionsFormobj.imageQuestion,
      timing: this.questionsFormobj.time,
      instruction: this.questionsFormobj.instruction,
      answer: this.questionsFormobj.answer,
      id: this.questionsArray.length + 1
    });
  }

  questionOptions(value: any) {
    const options = value.value;
    this.optionArray.push(options);
  }

  addPassageQuestion() {
    this.passageQuestions.push({
      question: this.questionsFormobj.question,
      answer: this.questionsFormobj.answer,
      time: this.questionsFormobj.time,
      options: this.optionArray,
      questionStatus: '0'
    });
    this.optionArray = [];
  }

  questionTypeCheckStatus(value) {
    if (value === '1') {
      this.passageTextBox = true;
      this.imageTextBox = false;
      this.displayInstructionAndTitle = true;
    } else if (value === '2') {
      this.passageTextBox = false;
      this.imageTextBox = true;
      this.imageText = true;
      this.displayInstructionAndTitle = true;
    }else if (value === '3') {
      this.passageTextBox = false;
      this.imageTextBox = true;
      this.imageText = false;
      this.displayInstructionAndTitle = true;
    } else {
      this.passageTextBox = false;
      this.imageTextBox = false;
      this.displayInstructionAndTitle = false;
    }
  }

  uploadImage(file) { console.log(file.target.files[0]);
    const image: any = file.target.files[0]; 
    let fileFormat = image.type.split('/')[0]; 
    if(fileFormat == 'image'){
      this.formateErr = false;
      this.size = image.size;
      const fr = new FileReader();
      fr.onload = () => { // when file has loaded 
        const img: any = new Image();
        img.onload = () => {
          this.width = img.width;
          this.height = img.height;
          const formData = new FormData();
          formData.append('image', file.target.files[0]);
          this.courseCategoriesproxy.uploadImageCategory(formData)
            .subscribe((success: any) => {
              console.log(success);
              this.questionsFormobj.imageQuestion = success.filename;
            });
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(image);
    } else if(fileFormat == 'audio'){ 
      this.formateErr = false;
      this.size = image.size;
      const fr = new FileReader();
      fr.onload = () => { // when file has loaded  
        const formData = new FormData();
          formData.append('image', file.target.files[0]); 
          this.courseCategoriesproxy.uploadImageCategory(formData)
            .subscribe((success: any) => {
              console.log(success);
              this.questionsFormobj.imageQuestion = success.filename;
            });
      };
      fr.readAsDataURL(image);
    }else {
      this.formateErr = true;
    }
    
  }

  saveAndContinue() {
    if (this.questionsArray.length >= 1) {
      console.log(this.questionsArray);
      this.courseData.timeline[this.parentIndex].topics[this.childIndex].questions = this.questionsArray;
      this.global.storeBulkData('courseData', this.courseData).subscribe(() => {
        this.questionsArray = [];
      });
    }
    this.global.navigateToNewPage('/course/create/test');
  }

}
