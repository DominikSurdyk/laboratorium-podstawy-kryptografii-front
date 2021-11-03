import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesVisualizationComponent } from './series-visualization.component';

describe('SeriesVisualizationComponent', () => {
  let component: SeriesVisualizationComponent;
  let fixture: ComponentFixture<SeriesVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesVisualizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
