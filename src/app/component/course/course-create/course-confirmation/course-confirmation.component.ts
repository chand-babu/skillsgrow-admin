import { Component, OnInit } from '@angular/core';
import { Global } from '../../../../../common/global';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailsProxy } from '../course-details/course-details.proxy';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-confirmation',
  templateUrl: './course-confirmation.component.html',
  providers: [CourseDetailsProxy]
})
export class CourseConfirmationComponent implements OnInit {
  public authorDetails: boolean = true;
  public confirmationCourse: boolean = false;
  public authorobj = {
    authorName: '',
    authorEmail: '',
    authorPhone: '',
    authorBiography: '',
    coursePrice: '',
    certificatePrice: ''
  };
  public paidCertificateInput: boolean = false;
  public certificateRate: any;
  public paidCourseInput: boolean = false;
  public courseRate: any;
  public closeResult: string;
  public coursePreview = [];
  public editorContent: any;

  constructor(public global: Global, public courseDetailProxy: CourseDetailsProxy,
    private modalService: NgbModal, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      console.log(success);
      const author = success.authorDetails;
      if (author) {
        this.authorDetails = true;
        this.confirmationCourse = false;
        if (author.length === 1) {
          if (author[0] !== null) {
            this.authorobj = author[0];
            if (this.authorobj.coursePrice !== 'Free') {
              this.courseRate = this.authorobj.coursePrice;
              this.authorobj.coursePrice = 'Paid';
              this.pricingType('coursePrice');
            }
            if (this.authorobj.certificatePrice !== 'Free') {
              this.certificateRate = this.authorobj.certificatePrice;
              this.authorobj.certificatePrice = 'Paid';
              this.pricingType('certificatePrice');
            }
          }
        }
      }
    });
  }

  confirmationSubmit() {
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      const data = success;
      if (data.update) {
        delete data.update;
        console.log("+++data=++++",data);
        this.courseDetailProxy.updateCourse(data)
        .subscribe((success: any) => {
          console.log(success);
          this.global.removeBulkData('courseData');
          this.global.navigateToNewPage('/course/categories');
        });
      } else {
        console.log("&&&&&@@@@@@@@@@@@&&&&&&", data)
        this.courseDetailProxy.addCourseDetails(data)
        .subscribe((success) => {
          console.log(success);
          this.global.removeBulkData('courseData');
          this.global.navigateToNewPage('/course/categories');
        });
      }
    });
  }

  pricingType(value) {
    if (value === 'coursePrice') {
      (this.authorobj.coursePrice === 'Paid') ? this.paidCourseInput = true : this.paidCourseInput = false;
    } else {
      (this.authorobj.certificatePrice === 'Paid') ? this.paidCertificateInput = true : this.paidCertificateInput = false;
    }
  }

  onSubmit() {
    if (this.paidCourseInput) {
      this.authorobj.coursePrice = this.courseRate;
    }
    if (this.paidCertificateInput) {
      this.authorobj.certificatePrice = this.certificateRate;
    }
    this.global.getBulkData('courseData')
    .subscribe((success: any) => {
      const data = success;
      data.authorDetails = [];
      data.authorDetails.push(this.authorobj);
      this.global.storeBulkData('courseData', data).subscribe(() => {
        this.coursePreview.push(data);
        this.editorContent = this.coursePreview[0].description;
        this.editorContent = this.sanitizer.bypassSecurityTrustHtml(this.editorContent);
        this.authorDetails = false;
        this.confirmationCourse = true;
      });
    });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
