import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseCreateComponent } from './../course-create.component';
import { Global } from '../../../../../common/global';
import { CourseDetailsProxy } from './course-details.proxy';
import { MessageConfirm } from '../../../../../common/message';
import { Constants } from '../../../../../common/constant';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  providers: [CourseDetailsProxy]
})
export class CourseDetailsComponent implements OnInit {
  public courseCategoryList: any;
  public courseCategoryForm = {
    authorDetails: [],
    categoryId: '',
    courseName: '',
    boostText: '',
    description: '',
    imageSmall: '',
    imageLarge: '',
    video: '',
    shortDescription: '',
    createdBy: '',
    timeline: '',
    active: true,
    status: ''
  };
  public courseForField = '';
  public selectCategoryList: any;
  editor: any;
  _returnedURL: any;
  public imageL = '';
  public imageS = '';
  public imagePath = Constants.IMAGEPATH;
  public display: boolean = false;
  public displayTheImageInDialogBox: any;
  public previewImageLink: boolean = false;
  public uploadImageLargeField: boolean = false;
  public uploadImageSmallField: boolean = false;

  public percentDone: number;
  public uploadSuccess: boolean;
  public size: any;
  public width: number;
  public height: number;

  public courseNameExist: boolean = false;//added by nandita
  public existCourseName: any;//added by nandita

  constructor(public course: CourseCreateComponent,
    public global: Global,
    public courseDetailsProxy: CourseDetailsProxy, public message: MessageConfirm) {
  }

  @ViewChild('coverFilesInput') imgType: ElementRef;

  ngOnInit() {
    this.listCourseCategory();
    this.global.getBulkData('courseData')
      .subscribe((success: any) => {
        const courseData = success;
        if (courseData) {
          this.existCourseName = courseData.courseName; //added by nandita
          this.previewImageLink = true;
          this.courseForField = courseData.status;
          this.courseCategoryForm.active = courseData.active;
        }
        if (!this.display) {
          this.uploadImageLargeField = false;
          this.uploadImageSmallField = false;
        }
      });
    // const courseData = this.global.getStorageDetail('courseData');
    // if (courseData) {
    //   this.previewImageLink = true;
    //   this.courseForField = courseData.status;
    //   this.courseCategoryForm.active = courseData.active;
    // }
    // if (!this.display) {
    //   this.uploadImageLargeField = false;
    //   this.uploadImageSmallField = false;
    // }
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
    Imageinput.addEventListener('change', () => {
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
    this.editor.insertEmbed(range.index, 'image', this.imagePath + this._returnedURL);
  }

  data() {
    this.course.items[0].routerLink = 'timeline';
  }

  listCourseCategory() {
    this.courseDetailsProxy.CategoryListData()
      .subscribe((success: any) => {
        console.log(success);
        this.courseCategoryList = success.data;
        this.global.getBulkData('courseData')
          .subscribe((success: any) => {
            if (success) {
              this.courseCategoryForm = success;
              this.courseCategoryList.filter((data => {
                if (data._id === this.courseCategoryForm.categoryId) {
                  this.selectCategoryList = data;
                }
              }));
            }
          });
      });
  }

  uploadCategoryImage(evt, imageType) {
    this.percentDone = 100;
    this.uploadSuccess = true;
    const image: any = evt.target.files[0];
    this.size = image.size;
    const fr = new FileReader();
    fr.onload = () => { // when file has loaded
      const img: any = new Image();
      if (imageType.name === 'imageLarge') {
        img.onload = () => {
          this.width = img.width;
          this.height = img.height;
          if (this.width === 1000 && this.height === 350) {
            const formData = new FormData();
            formData.append('image', evt.target.files[0], evt.target.files[0].name);
            this.uploadImageCommonFunction(formData, imageType.name);
          } else {
            imageType.reset();
            this.message.alert('image ratio should be 1000*350');
          }
        };
      } else {
        img.onload = () => {
          this.width = img.width;
          this.height = img.height;
          if (this.width === 250 && this.height === 200) {
            const formData = new FormData();
            formData.append('image', evt.target.files[0], evt.target.files[0].name);
            this.uploadImageCommonFunction(formData, imageType.name);
          } else {
            imageType.reset();
            this.message.alert('image ratio should be 250*200');
          }
        };
      }
      img.src = fr.result; // This is the data URL
    };
    fr.readAsDataURL(image);
    // this.imgType.nativeElement.value = '';
  }

  uploadImageCommonFunction(formData, type) {
    this.courseDetailsProxy.uploadImageCategory(formData)
      .subscribe((success: any) => {
        console.log(success);
        if (type === 'imageLarge') {
          this.courseCategoryForm.imageLarge = success.filename;
        } else {
          this.courseCategoryForm.imageSmall = success.filename;
        }
      });
  }

  onSubmit() {
    this.course.items[1].command();
    this.course.items[1].disabled = false;
    this.course.items[0].routerLink = '/course/create/details';
    this.course.items[1].routerLink = '/course/create/timeline';
    this.course.items[0].disabled = false;
    this.courseCategoryForm.categoryId = this.selectCategoryList._id;
    this.courseCategoryForm.createdBy = this.global.getStorageDetail('userId')._id;
    this.courseCategoryForm.status = this.courseForField;
    this.global.storeBulkData('courseData', this.courseCategoryForm).subscribe(() => {
      this.global.navigateToNewPage('/course/create/timeline');
    });
  }

  previewImage(image, imageStatus) {
    this.display = true;
    if (imageStatus === 0) {
      this.displayTheImageInDialogBox = image;
      this.uploadImageLargeField = false;
      this.uploadImageSmallField = false;
    } else {
      this.displayTheImageInDialogBox = '';
      if (image === 'Large') {
        this.uploadImageLargeField = true;
        this.uploadImageSmallField = false;
      } else {
        this.uploadImageSmallField = true;
        this.uploadImageLargeField = false;
      }
    }
  }

  courseNameExistOrNot() {
    console.log("++++++++++")
    let checkInEdit = (this.courseCategoryForm.courseName == this.existCourseName)
    this.courseDetailsProxy.checkCourseName(this.courseCategoryForm.courseName)
      .subscribe((success: any) => {
        console.log("++++++fdfdfdf++++", success.result && !checkInEdit)
        if (success.result && !checkInEdit) {
          this.courseNameExist = true;
        } else {
          this.courseNameExist = false;
        }
      });
  }//added by nandita

}
