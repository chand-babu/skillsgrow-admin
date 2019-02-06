import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppliedInternshipComponent } from './list-applied-internship.component';

describe('ListAppliedInternshipComponent', () => {
  let component: ListAppliedInternshipComponent;
  let fixture: ComponentFixture<ListAppliedInternshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAppliedInternshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppliedInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
