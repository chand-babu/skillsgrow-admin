import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../common/constant';
import { Global } from '../../../../common/global';
import { BlogEditProxy } from './blog-edit.proxy';
import { MessageConfirm } from '../../../../common/message';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-blog-edit',
    templateUrl: './blog-edit.component.html',
    styleUrls: ['./blog-edit.component.css'],
    providers: [BlogEditProxy]
})
export class BlogEditComponent implements OnInit {
    public blogDetails: boolean = true;
    public confirmationBlog: boolean = false;

    public blogCategoryForm = {
        categoryId: '',
        blogName: '',
        image: '',
        video: '',
        shortDescription: '',
        description: '',
        status: '',
        active: true
    };
    editor: any;
    _returnedURL: any;
    public imagePath = Constants.IMAGEPATH;
    public previewImageLink: boolean = false;

    public display: boolean = false;

    public blogImage: any;
    public displayTheImageInDialogBox: any;
    public uploadImageField: boolean = false;

    public percentDone: number;
    public uploadSuccess: boolean;
    public size: any;
    public width: number;
    public height: number;

    public existBlogName: any;
    public blogNameExist: boolean = false;

    public blogUpdate: boolean = false;

    public blogPreview = [];
    public editorContent: any;

    public courseCategoryList: any;

    constructor(private sanitizer: DomSanitizer, private modalService: NgbModal,public blogEditProxy: BlogEditProxy, public message: MessageConfirm, public global: Global) { }


    ngOnInit() {
        this.listCourseCategory();
        this.global.getBulkData('blogData')
            .subscribe((success: any) => {
                const blogData = success;
                if (blogData) {
                    this.blogCategoryForm = blogData;
                    this.existBlogName = blogData.blogName; //added by nandita
                    this.previewImageLink = true;
                    this.blogCategoryForm.image = blogData.blogImage;
                    this.blogCategoryForm.video = blogData.blogVideo;
                    this.blogCategoryForm.active = blogData.active;
                }
                if (!this.display) {
                    this.uploadImageField = false;
                }
            });
    }

    listCourseCategory() {
        this.blogEditProxy.CategoryListData()
            .subscribe((success: any) => {
                console.log(success);
                this.courseCategoryList = success.data;
            });
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
                this.blogEditProxy.uploadImageCategory(formData).subscribe((res: any) => {
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


    uploadCategoryImage(evt, blogImage) {
        console.log("uploadCategoryImage", blogImage)
        const image: any = evt.target.files[0];
        this.size = image.size;
        const fr = new FileReader();
        fr.onload = () => { // when file has loaded
            const img: any = new Image();
            img.onload = () => {
                this.width = img.width;
                this.height = img.height;
                if (this.width >= 250 && this.width <= 1024 && this.height >= 200 && this.height <= 768) {
                    const formData = new FormData();
                    formData.append('image', evt.target.files[0]);
                    this.blogEditProxy.uploadImageCategory(formData)
                        .subscribe((success: any) => {
                            console.log(success);
                            this.blogCategoryForm.image = success.filename;
                        });
                } else {
                    this.message.alert('Image height and width should be between 200 - 768 and 250 - 1024 pixel respectively');
                    blogImage.reset();
                }
            };
            img.src = fr.result;
        };
        fr.readAsDataURL(image);
    }


    onSubmit() {
        this.blogPreview.push(this.blogCategoryForm);
        this.editorContent = this.blogPreview[0].description;
        this.editorContent = this.sanitizer.bypassSecurityTrustHtml(this.editorContent);
        this.blogDetails = false;
        this.confirmationBlog = true;
    }

    confirmationSubmit() {
        this.blogCategoryForm.status = '0';
        this.blogEditProxy.updateBlog(this.blogCategoryForm)
            .subscribe((success: any) => {
                // console.log(success);
                if (success.data) {
                    this.global.removeBulkData('blogData');
                    this.global.navigateToNewPage('/blog/list');
                }
            });
    }

    openLg(content) {
        this.modalService.open(content, { size: 'lg' });
    }

    blogNameExistOrNot() {
        let checkInEdit = (this.blogCategoryForm.blogName == this.existBlogName);
        this.blogEditProxy.checkBlogName(this.blogCategoryForm.blogName)
            .subscribe((success: any) => {
                // if (success.result) {
                //     this.blogNameExist = true;
                // } else {
                //     this.blogNameExist = false;
                // }
                if (success.result && !checkInEdit) {
                    this.blogNameExist = true;
                } else {
                    this.blogNameExist = false;
                }
            });
    }

    previewImage(image, imageStatus) {
        this.display = true;
        if (imageStatus === 0) {
            this.displayTheImageInDialogBox = image;
            console.log('this.displayTheImageInDialogBox', this.displayTheImageInDialogBox)
            this.uploadImageField = false;
        } else {
            this.displayTheImageInDialogBox = '';
            this.uploadImageField = true;
        }
    }


}
