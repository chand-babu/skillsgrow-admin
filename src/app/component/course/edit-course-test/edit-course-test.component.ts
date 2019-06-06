import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from '../../../../common/global';
import { MessageConfirm } from '../../../../common/message';
import { CourseCategoryProxy } from '../course-categories/course-categories.proxy';
import { Constants } from '../../../../common/constant';

@Component({
    selector: 'app-edit-course-test',
    templateUrl: './edit-course-test.component.html',
    styleUrls: ['./edit-course-test.component.less'],
    providers: [CourseCategoryProxy]
})
export class EditCourseTestComponent implements OnInit {
    // public questionsFormobj = {
    //     questionStatus: '',
    //     question: '',
    //     passage: '',
    //     options: [],
    //     time: '',
    //     imageQuestion: '',
    //     passageTitle: '',
    //     instruction: '',
    //     answer: '',
    // };

    public imageQuestion: any;

    public imageQuestionvalidation = '';

    public optionArray = [];
    public passageTextBox: boolean = false;
    public imageTextBox: boolean = false;
    public imageText: boolean = false;
    public parentIndex: any;
    public childIndex: any;
    public questionsArray: any;
    public passageQuesArray: any;
    public questionsFormobj = [];
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

    //=============
    public display: boolean = false;
    public displayTheImageInDialogBox: any;
    public uploadImageField: boolean = false;
    public imagePath = Constants.IMAGEPATH;
    public questionIndexForImage: any;

    public formValidate: boolean = false;

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
                // console.log("=============getQuestionFromLocalStorage===========", getQuestionFromLocalStorage)
                if (getQuestionFromLocalStorage) {
                    this.questionsFormobj = getQuestionFromLocalStorage;
                    this.questionsArray = JSON.stringify(getQuestionFromLocalStorage);
                }
            });
    }

    previewImage(image, imageStatus, quesStatus, questionIndex) {
        this.display = true;
        if (imageStatus === 0) {
            this.questionIndexForImage = questionIndex;
            this.displayTheImageInDialogBox = image;
            console.log('this.displayTheImageInDialogBox', this.displayTheImageInDialogBox)
            this.uploadImageField = false;
        } else {
            this.questionIndexForImage = questionIndex;
            this.displayTheImageInDialogBox = '';
            this.uploadImageField = true;
        }
        if (quesStatus == 2) {
            this.imageText = true;
        } else if (quesStatus == 3) {
            this.imageText = false;
        }
    }

    onSubmit(questionIndex) {
        if (typeof this.questionsArray == 'string') {
            this.questionsArray = JSON.parse(this.questionsArray);
        }
        this.questionsArray[questionIndex] = this.questionsFormobj[questionIndex];
    }

    deleteQuestion(questionIndex){
        this.questionsFormobj.splice(questionIndex, 1);
        if (typeof this.questionsArray == 'string') {
            this.questionsArray = JSON.parse(this.questionsArray);
            this.questionsArray.splice(questionIndex, 1);
        }else{
            this.questionsArray.splice(questionIndex, 1);
        }
   
    }

    deletePassageQuestion(questionIndex, passagequesIndex){
        this.questionsFormobj[questionIndex].question.splice(passagequesIndex, 1);
        if (typeof this.questionsArray == 'string') {
            this.questionsArray = JSON.parse(this.questionsArray);
            this.questionsArray[questionIndex].question.splice(passagequesIndex, 1);
        }else{
            this.questionsArray[questionIndex].question.splice(passagequesIndex, 1);
        }

    }

    onPassageQuesSubmit(questionIndex, passageQuesindex) {
        if (typeof this.questionsArray == 'string') {
            this.questionsArray = JSON.parse(this.questionsArray);
        }
        this.questionsArray[questionIndex].question[passageQuesindex] = this.questionsFormobj[questionIndex].question[passageQuesindex];
        // console.log("passageQuesindex", passageQuesindex)
    }

    uploadImage(file) {
        // console.log("+++++ this.questionIndexForImage+++++++", this.questionIndexForImage)
        const image: any = file.target.files[0];
        let fileFormat = image.type.split('/')[0];
        // console.log('================>>>>>>>', fileFormat);
        // return true;
        if (fileFormat == 'image') {
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
                            // console.log('ressult============>', success, 'before upload in qs', this.questionsFormobj[this.questionIndexForImage].imageQuestion);
                            this.questionsFormobj[this.questionIndexForImage].imageQuestion = success.filename;
                            // console.log('after set in quesIndex===>', this.questionsFormobj[this.questionIndexForImage].imageQuestion);
                        });
                };
                img.src = fr.result;
            };
            fr.readAsDataURL(image);
        } else if (fileFormat == 'audio') {
            this.formateErr = false;
            this.size = image.size;
            const fr = new FileReader();
            fr.onload = () => { // when file has loaded  
                const formData = new FormData();
                formData.append('image', file.target.files[0]);
                this.courseCategoriesproxy.uploadImageCategory(formData)
                    .subscribe((success: any) => {
                        // console.log('ressult============>', success, 'before upload in qs', this.questionsFormobj[this.questionIndexForImage].imageQuestion);
                        this.questionsFormobj[this.questionIndexForImage].imageQuestion = success.filename;
                        // console.log('after set in quesIndex===>', this.questionsFormobj[this.questionIndexForImage].imageQuestion);
                    });
            };
            fr.readAsDataURL(image);
        } else {
            this.formateErr = true;
        }

    }

    saveAndContinue() {
        if (typeof this.questionsArray == 'string') {
            this.questionsArray = JSON.parse(this.questionsArray);
            // if (this.questionsArray.length >= 1) {
                this.courseData.timeline[this.parentIndex].topics[this.childIndex].questions = this.questionsArray;
                // console.log('this.timeline==========>', this.courseData.timeline[this.parentIndex].topics[this.childIndex]);
                this.global.storeBulkData('courseData', this.courseData).subscribe(() => {
                    this.questionsArray = [];
                });
            // }
            this.global.navigateToNewPage('/course/create/test');
        } else {
            // if (this.questionsArray.length >= 1) {
                this.courseData.timeline[this.parentIndex].topics[this.childIndex].questions = this.questionsArray;
                // console.log('this.timeline==========>', this.courseData.timeline[this.parentIndex].topics[this.childIndex]);
                this.global.storeBulkData('courseData', this.courseData).subscribe(() => {
                    this.questionsArray = [];
                });
            // }
            this.global.navigateToNewPage('/course/create/test');
        }
    }

}
