import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRubricDialogComponent } from './set-rubric-dialog.component';

describe('SetRubricDialogComponent', () => {
  let component: SetRubricDialogComponent;
  let fixture: ComponentFixture<SetRubricDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRubricDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRubricDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
