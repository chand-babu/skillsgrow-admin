import { Component, OnInit } from '@angular/core';
import { BlogListProxy } from './blog-list.proxy';
import { Global } from '../../../../common/global';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html',
    styleUrls: ['./blog-list.component.css'],
    providers: [BlogListProxy]
})
export class BlogListComponent implements OnInit {
    public blogListData: any;
    message: any;
    constructor(public blogListProxy: BlogListProxy, public global: Global, public messageConfirm: ConfirmationService) { }

    ngOnInit() {
        this.getBlogList();
    }

    getBlogList(){
        this.blogListProxy.BlogListData()
            .subscribe((success: any) => {
                this.blogListData = success.data;
            });
    }

    blogEdit(blogDetails){
        blogDetails.update = true;
        this.global.storeBulkData('blogData', blogDetails).subscribe(() => {
            this.global.navigateToNewPage('/blog/edit');
        });
    }

    deleteBlog(blogId){
        this.messageConfirm.confirm({
            message: 'Are you sure that you want to this blog?',
            accept: () => {
                this.blogListProxy.blogDelete(blogId)
                    .subscribe((success: any) => {
                        console.log(success);
                        this.getBlogList();
                    });
            }
        });
    }

    changeBlogStatus(id, active){
        (active === true) ? active = false : active = true;
        this.blogListProxy.activeAndInactiveBlog({ _id: id, active: active })
            .subscribe((success: any) => {
                this.getBlogList();
            });
    }

}
