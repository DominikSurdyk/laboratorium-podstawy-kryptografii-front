import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBbsComponent } from './generate-bbs.component';

describe('GenerateBbsComponent', () => {
  let component: GenerateBbsComponent;
  let fixture: ComponentFixture<GenerateBbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateBbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
