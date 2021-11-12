import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface UploadedFile {
  name: string;
  content: string;
}

@Component({
  selector: 'app-upload-file',
  styleUrls: ['./upload-file.component.scss'],
  template: `
    <input type="file" class="file-input"
           (change)="onFileSelected($event)" #fileUpload>
    <button mat-raised-button color="primary"
            (click)="fileUpload.click()">{{buttonLabel}}</button>
  `
})
export class UploadFileComponent implements OnInit {
  @Output() uploadedFile = new EventEmitter<UploadedFile>();

  @Input() buttonLabel: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.uploadedFile.emit({
            content: String(fileReader.result),
            name: event.target.files[0].name
          });
      }
      fileReader.readAsText(file);
    }
  }

}
