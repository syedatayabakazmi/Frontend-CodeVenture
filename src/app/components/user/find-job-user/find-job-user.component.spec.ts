import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobUserComponent } from './find-job-user.component';

describe('FindJobUserComponent', () => {
  let component: FindJobUserComponent;
  let fixture: ComponentFixture<FindJobUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindJobUserComponent]
    });
    fixture = TestBed.createComponent(FindJobUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
