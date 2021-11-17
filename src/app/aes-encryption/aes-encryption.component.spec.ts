import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AesEncryptionComponent } from './aes-encryption.component';

describe('EcbEncodeComponent', () => {
  let component: AesEncryptionComponent;
  let fixture: ComponentFixture<AesEncryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AesEncryptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AesEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
