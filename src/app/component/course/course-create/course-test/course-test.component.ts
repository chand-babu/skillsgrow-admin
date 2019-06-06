import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Global } from '../../../../../common/global';
import { CourseCreateComponent } from './../course-create.component';
import { Router } from '@angular/router';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-course-test',
  templateUrl: './course-test.component.html'
})
export class CourseTestComponent implements OnInit {
  public about;
  public data;
  public display: boolean = false;
  public learningDetails: any;
  public del: any;
  public i: number;
  public j: number;
  public uploadedQuestions: any;
  public allQuestion = [];
  public noOfQuestions = 0;

  constructor(public global: Global, public course: CourseCreateComponent,
    public router: Router) {
  }

  ngOnInit() {
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      this.learningDetails = success.timeline;
      console.log("timeline data===>", this.learningDetails);
    });
    // this.learningDetails = this.global.getStorageDetail('courseData').timeline;
    // const courseTimeline = this.learningDetails;
    // courseTimeline.filter((data) => {
    //   data.topics.filter((topic) => {s
    //     if (topic.questions) {
    //       this.allQuestion = [];
    //       this.uploadedQuestions = topic.questions;
    //       this.changingUploadedQuestionFormat();
    //       topic.questions = this.allQuestion;
    //       console.log(this.allQuestion);
    //     }
    //   });
    // }); 
  }

  onFileChange(evt: any) {
    console.log(evt);
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const result = {};
      this.data = XLSX.utils.sheet_to_json(wb.Sheets[wsname], { header: 1 });
      if (this.data.length > 0) {
        // result[wsname] = this.data;
      }
      this.allQuestion = [];
      this.del = this.data;
      this.uploadedQuestions = this.data;
      console.log(this.uploadedQuestions);
      this.changingUploadedQuestionFormat();
      this.learningDetails[this.i].topics[this.j].questions = this.allQuestion;
    };
    reader.readAsBinaryString(target.files[0]);
    this.display = false;
  }

  excelFileDownload() {
    /* generate worksheet */
    const ws_data = [['S.no', 'Question status', 'Question Type', 'Questions', 'Options', 'Correct Answer', 'Time']];
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(ws_data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  showDialog(i, j) {
    this.i = i;
    this.j = j;
    this.display = true;
  }

  saveAndContinue() {
    this.course.items[4].command();
    this.course.items[0].disabled = false;
    this.course.items[1].disabled = false;
    this.course.items[2].disabled = false;
    this.course.items[3].disabled = false;
    this.course.items[4].disabled = false;
    this.course.items[0].routerLink = '/course/create/details';
    this.course.items[1].routerLink = '/course/create/timeline';
    this.course.items[2].routerLink = '/course/create/learning';
    this.course.items[3].routerLink = '/course/create/test';
    this.course.items[4].routerLink = '/course/create/confirmation';
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      const test = success;
      test.timeline = this.learningDetails;
      this.global.storeBulkData('courseData', test).subscribe(() => {
        this.global.navigateToNewPage('/course/create/confirmation');
      });
    });
  }

  addQuestionPage(i, j) {
    this.router.navigate(['course/exam', i, j]);
  }

  editQuestionPage(i,j){
    this.router.navigate(['course/edit-test', i, j]);
  }


  // changing uploaded question format
  changingUploadedQuestionFormat() {
    this.uploadedQuestions.filter((data, index) => {
      if (data[1] === '0') {
        this.chooseQuestion(data, index);
      } else if (data[1] === '1') {
        this.passageQuestion(data, index);
      }
    });
  }

  // handle the choose/multiple question
  chooseQuestion(data, index) {
    let question = [];
    question.push({
      questionStatus: data[1],
      question: data[3],
      options: data[4].split(','),
      answer: data[5],
      questionType: data[2],
      time: data[6],
      id: index
    });
    for (let i = 0; i < question[0].options.length; i++) {
      question[0].options[i] = question[0].options[i].trim();
    }
    this.allQuestion.push(question[0]);
    question = [];
    console.log(this.allQuestion);
  }

  // handle the passage question
  passageQuestion(data, index) {
    let question = [];
    const passageQues = [];
    for (let i = 1; i <= data[4]; i++) {
      passageQues.push({
        questionStatus: this.uploadedQuestions[index][1],
        question: this.uploadedQuestions[index + i][3],
        options: this.uploadedQuestions[index + i][4].split(','),
        answer: this.uploadedQuestions[index + i][5],
        questionType: this.uploadedQuestions[index + i][2],
        time: this.uploadedQuestions[index + i][6],
      });
    }
    question.push({
      questionStatus: data[1],
      passage: data[3],
      instruction: data[5],
      question: passageQues,
      passageTitle: data[6],
      id: index
    });
    for (let i = 0; i < question[0].question.length; i++) {
      for (let j = 0; j < question[0].question[i].options.length; j++) {
        question[0].question[i].options[j] = question[0].question[i].options[j].trim();
      }
    }
    this.allQuestion.push(question[0]);
    question = [];
    console.log(this.allQuestion);
  }

  // finding questions length
  findingQuestionLength(question) {
    question.filter((ques) => {
      if (ques.questionStatus === '1') {
        this.noOfQuestions = this.noOfQuestions + ques.question.length;
      } else {
        this.noOfQuestions++;
      }
    });
    return this.noOfQuestions;
  }

}
