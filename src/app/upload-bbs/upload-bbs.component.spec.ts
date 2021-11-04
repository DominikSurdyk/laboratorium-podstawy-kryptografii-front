import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBbsComponent } from './upload-bbs.component';

describe('UploadBbsComponent', () => {
  let component: UploadBbsComponent;
  let fixture: ComponentFixture<UploadBbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
