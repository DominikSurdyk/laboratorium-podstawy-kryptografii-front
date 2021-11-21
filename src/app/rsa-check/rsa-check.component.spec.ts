import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsaCheckComponent } from './rsa-check.component';

describe('RsaCheckComponent', () => {
  let component: RsaCheckComponent;
  let fixture: ComponentFixture<RsaCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsaCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsaCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
