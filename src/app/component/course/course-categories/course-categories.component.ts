import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesDataModel } from './../../../interface/all';
import { CourseCategoryProxy } from './course-categories.proxy';
import { Global } from './../../../../common/global';
import { MessageConfirm } from '../../../../common/message';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-course-categories',
  templateUrl: './course-categories.component.html',
  providers: [CourseCategoryProxy]
})

export class CourseCategoriesComponent implements OnInit {
  msgs: Message[] = [];

  categories: CategoriesDataModel[];
  tableLoading: boolean = false;
  public categoryForm = {
    categoryName: '',
    categoryImg: '',
    categoryType: 0,
    userId: '',
    status: ''
  };
  public file: any;
  public img: any;
  public categoryImage: any;
  public _URL = window.URL;
  public categoryList: any;
  cols = [
    { field: 'categoryName', header: 'Title' },
    { field: 'course', header: 'Courses' },
    { field: 'createdOn', header: 'createdOn' },
    { field: 'status', header: 'status' }
  ];

  add = {
    'username': 'srikumar',
    'password': 'srikumar',
    'emailId': 'srikumar100@gmail.com',
    'phone': 9876543210,
    'image': '',
    'rollsPermission': 0,
    'status': 1,
  };

  public size: any;
  public width: number;
  public height: number;

  dropDownEditatbleStatusOption: any = [{ label: 'Active', value: 0 }, { label: 'InActive', value: 1 }];
  typeEditatbleStatusOption: any = [{ label: 'Skillsgrow Courses', value: 0 }, { label: 'Internship', value: 1 }];
  constructor(public courseCategories: CourseCategoryProxy,
    public global: Global, private message: MessageConfirm) {
  }

  ngOnInit() {
    this.listAddCategory();
  }

  valuesUpdated(value) {
    // this.tableLoading = true;
    let data = {
      id  : value.data._id,
      categoryName : value.data.categoryName,
      categoryImg : value.data.categoryImg,
      categoryType : value.data.categoryType,
      status : value.data.status
    }
    console.log(data);
    this.courseCategories.activeAndInactive(data)
        .subscribe((success) => {
          console.log(success);
          this.listAddCategory();
        });
  }

  addsubAdmin() {
    this.courseCategories.addAdmin(this.add)
      .subscribe((success: any) => {
        console.log(success);
      });
  }

  uploadCategoryImage(evt, categoryImage) {
    const image: any = evt.target.files[0];
    this.size = image.size;
    const fr = new FileReader();
    fr.onload = () => { // when file has loaded
      const img: any = new Image();
      img.onload = () => {
        this.width = img.width;
          this.height = img.height;
        if (this.width === 250 && this.height === 200) {
          const formData = new FormData();
          formData.append('image', evt.target.files[0]);
          this.courseCategories.uploadImageCategory(formData)
            .subscribe((success: any) => {
              this.categoryForm.categoryImg = success.filename;
            });
        } else {
          this.message.alert('image ratio should be 250*200');
          categoryImage.reset();
        }
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(image);
  }

    onSubmit() {
      this.categoryForm.userId = this.global.getStorageDetail('userId')._id;
      this.categoryForm.status = '0';
      console.log(this.categoryForm);
      this.courseCategories.categoryFormData(this.categoryForm)
        .subscribe((success: any) => {
          console.log(success);
          if (success.data) {
            this.listAddCategory('course Added');
          }
        });
    }


    listAddCategory(courseStatus ?) {
      this.courseCategories.CategoryListData()
        .subscribe((success: any) => {
          console.log(success);
          this.categoryList = success.data;
          this.categoryList.filter((data) => {
            if (data.course.length <= 0) {
              data.course = 0;
            } else {
              data.course = data.course.length;
            }
            data.createdOn = data.createdOn.split('T')[0];
          });
          if (courseStatus) {
            this.msgs = [{ severity: 'info', summary: 'Category', detail: 'Successfully Created Category' }];
          }
        });
    }


    courseActiveAndInactive(data) {
      delete data.course;
      delete data.createdOn;
      data.id = data._id;
      delete data._id;
      console.log(data);
      this.courseCategories.activeAndInactive(data)
        .subscribe((success) => {
          console.log(success);
          this.listAddCategory();
        });
    }

    typeActiveAndInactive(data) {
      let dataSet = {
        id: data._id,
        categoryType: data.categoryType
      }
      console.log(dataSet);
      this.courseCategories.typeActiveAndInactive(dataSet)
        .subscribe((success) => {
          console.log(success);
          this.listAddCategory();
        });
    }
  }
