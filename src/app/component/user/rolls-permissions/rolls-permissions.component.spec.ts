import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollsPermissionsComponent } from './rolls-permissions.component';

describe('RollsPermissionsComponent', () => {
  let component: RollsPermissionsComponent;
  let fixture: ComponentFixture<RollsPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollsPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
