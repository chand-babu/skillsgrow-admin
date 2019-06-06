import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCourseTestComponent } from './edit-course-test.component';

describe('EditCourseTestComponent', () => {
    let component: EditCourseTestComponent;
    let fixture: ComponentFixture<EditCourseTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditCourseTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditCourseTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
