import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCommentListComponent } from './blog-comment-list.component';

describe('BlogCreateComponent', () => {
    let component: BlogCommentListComponent;
    let fixture: ComponentFixture<BlogCommentListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BlogCommentListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlogCommentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
