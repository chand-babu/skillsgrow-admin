import { Component, OnInit } from '@angular/core';
import { BlogCommentListProxy } from './blog-comment-list.proxy';
import { Global } from '../../../../common/global';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-blog-comment-list',
    templateUrl: './blog-comment-list.component.html',
    styleUrls: ['./blog-comment-list.component.css'],
    providers: [BlogCommentListProxy]
})
export class BlogCommentListComponent implements OnInit {
    public blogCommentListData: any;
    message: any;
    constructor(public blogCommentListProxy: BlogCommentListProxy, public global: Global, public messageConfirm: ConfirmationService) { }

    ngOnInit() {
        this.getCommentListData();
    }

    getCommentListData() {
        this.blogCommentListProxy.blogCommentListData()
            .subscribe((success: any) => {
                // console.log('=======',success)
                this.blogCommentListData = success.data;
            });
    }

    changeBlogCommentStatus(id, active) {
        (active === true) ? active = false : active = true;
        this.blogCommentListProxy.activeAndInactiveBlogComment({ _id: id, active: active })
            .subscribe((success: any) => {
                this.getCommentListData();
            });
    }

    deleteBlogComment(blogId) {
        this.messageConfirm.confirm({
            message: 'Are you sure that you want to this comment?',
            accept: () => {
                this.blogCommentListProxy.blogCommentDelete(blogId)
                    .subscribe((success: any) => {
                        console.log(success);
                        this.getCommentListData();
                    });
            }
        });
    }

}
