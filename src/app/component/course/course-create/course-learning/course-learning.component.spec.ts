import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLearningComponent } from './course-learning.component';

describe('CourseLearningComponent', () => {
  let component: CourseLearningComponent;
  let fixture: ComponentFixture<CourseLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
