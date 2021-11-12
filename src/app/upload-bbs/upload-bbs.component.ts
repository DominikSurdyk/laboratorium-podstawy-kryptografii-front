import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-upload-bbs',
  styleUrls: ['./upload-bbs.component.scss'],
  template: `
    <mat-card class="container">
      <input type="file" class="file-input"
             (change)="onFileSelected($event)" #fileUpload>
      <button mat-raised-button color="primary"
              (click)="fileUpload.click()">Wgraj plik
      </button>
      <app-series-visualization
        *ngIf="isUploadedFile"
        [series]="series"
      ></app-series-visualization>
    </mat-card>
  `
})
export class UploadBbsComponent implements OnInit {
  series: boolean[] = [];

  constructor() {
  }

  get isUploadedFile(): boolean {
    return this.series.length !== 0;
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.saveAsBoolArray(String(fileReader.result));
      }
      fileReader.readAsText(file);
    }
  }

  saveAsBoolArray(series: string): void {
    var tmpSeries: boolean[] = [];
    for (var i = 0; i < series.length; i++) {
      tmpSeries.push(this.castToBool(series[i]))
    }
    this.series = tmpSeries;
    console.log(this.series)
  }

  castToBool(digit: string): boolean {
    return digit === '1';
  }
}
