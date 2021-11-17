import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AesEncodeComponent } from './aes-encode.component';

describe('EcbEncodeComponent', () => {
  let component: AesEncodeComponent;
  let fixture: ComponentFixture<AesEncodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AesEncodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AesEncodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
