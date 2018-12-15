import { Component, OnInit } from '@angular/core';
import { BannerImagesProxy } from './bannerImages.proxy';
import { MessageConfirm } from '../../../common/message';
import { Constants } from '../../../common/constant';

@Component({
    selector: 'app-banner-images',
    templateUrl: './bannerImages.component.html',
    providers: [BannerImagesProxy]
})
export class BannerImagesComponent implements OnInit {
    public imagePath = Constants.IMAGEPATH;
    bannerImageFormData = {
        id:'',
        image: '',
        imageTitle: '',
        description: '',
        link: '',
        status: 0
    };
    uploadImageObj: any;
    public _URL = window.URL;
    uploadImageresponse: any;
    public addedBannerImageData: any;
    public addedBannerImages: boolean = false;
    display: boolean = false;
    public statusConfirmBox: boolean = false;
    public bannerId: any;
    displayTheImageInDialogBox: any;

    public updateButton: boolean= false;

    // images variables
    public percentDone: number;
    public uploadSuccess: boolean;
    public size: any;
    public width: number;
    public height: number;

    constructor(public bannerimagesproxy: BannerImagesProxy, private message: MessageConfirm) { }

    ngOnInit() {
        this.listTheBannerImages();
    }

    uploadCategoryImage(file, categoryImage) {
        this.uploadSuccess = true;
        const image: any = file.target.files[0];
        this.size = image.size;
        const fr = new FileReader();
        fr.onload = () => { // when file has loaded
            const img: any = new Image();
            img.onload = () => {
                this.width = img.width;
                this.height = img.height;
                if (this.width === 1500 && this.height === 350) {
                    const formData = new FormData();
                    formData.append('image', file.target.files[0]);
                    this.bannerimagesproxy.uploadImageCategory(formData)
                        .subscribe((success: any) => {
                            this.percentDone = 100;
                            this.uploadImageresponse = success.filename;
                        });
                } else {
                    categoryImage.reset();
                    this.message.alert('image ratio should be 1500*350');
                }
            };
            img.src = fr.result; // This is the data URL
        };
        fr.readAsDataURL(image);
    }

    onSubmit() {
        console.log(this.updateButton);
        if(this.updateButton){
            // console.log(this.bannerImageFormData);
            this.bannerimagesproxy.updateBannerImage(this.bannerImageFormData)
            .subscribe((success) => {
                console.log(success);
                this.listTheBannerImages();
            });
        }else{
            this.bannerImageFormData.image = this.uploadImageresponse;
            // console.log(this.bannerImageFormData);
            
            this.bannerimagesproxy.bannerImages(this.bannerImageFormData)
                .subscribe((success) => {
                    console.log(success);
                    this.listTheBannerImages();
                });   
        }
    }

    listTheBannerImages() {
        this.bannerimagesproxy.bannerImagesLists()
            .subscribe((success: any) => {
                console.log(success);
                this.addedBannerImageData = success.data;
                this.addedBannerImageData.filter((data) => {
                    data.createdOn = data.createdOn.split('T')[0];
                });
            });
    }

    activeAndInactiveBannerImages(id, status) {
        console.log(id, status);
        if (status === 0) {
            status = 1;
        } else {
            status = 0;
        }
        this.bannerimagesproxy.activeAndInactive({ id: id, status: status })
            .subscribe((success) => {
                console.log(success);
                this.listTheBannerImages();
            });
    }

    viewAllBannerImages() {
        if (this.addedBannerImages) {
            this.addedBannerImages = false;
            this.updateButton = false;
            this.bannerImageFormData = {
                id:'',
                image: '',
                imageTitle: '',
                description: '',
                link: '',
                status: 0
            };
        } else {
            this.updateButton = true;
            this.addedBannerImages = true;
        }
    }

    deleteImageBanner() {
        this.statusConfirmBox = false;
        this.bannerimagesproxy.deleteBannerImagesLists(this.bannerId)
            .subscribe((success) => {
                this.listTheBannerImages();
            });
    }

    editImageBanner(id) {
        this.bannerimagesproxy.getBannerImagesDetails(id)
            .subscribe((success: any) => {
                let data = success.data[0];
                if(success.result) {
                    this.updateButton = true;
                    this.addedBannerImages = false;
                    this.bannerImageFormData.id = data._id;
                    this.bannerImageFormData.imageTitle = data.imageTitle;
                    this.bannerImageFormData.description = data.description;
                    this.bannerImageFormData.link = data.link;
                    this.bannerImageFormData.image = data.image;
                }  
                
            });
    }

    openConfirmation(id){
        this.statusConfirmBox = true;
        this.bannerId = id;
    }

    showDialog(image) {
        this.display = true;
        this.displayTheImageInDialogBox = image;
    }

}
