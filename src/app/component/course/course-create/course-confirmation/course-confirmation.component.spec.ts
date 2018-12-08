import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseConfirmationComponent } from './course-confirmation.component';

describe('CourseConfirmationComponent', () => {
  let component: CourseConfirmationComponent;
  let fixture: ComponentFixture<CourseConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
