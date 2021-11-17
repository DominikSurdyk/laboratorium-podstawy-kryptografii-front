import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AesDecryptionComponent } from './aes-decryption.component';

describe('EcbDecodeComponent', () => {
  let component: AesDecryptionComponent;
  let fixture: ComponentFixture<AesDecryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AesDecryptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AesDecryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
