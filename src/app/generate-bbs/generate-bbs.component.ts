import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {BackendCommunicationService} from "../services/backend-communication.service";

@Component({
  selector: 'app-generate-bbs',
  styleUrls: ['./generate-bbs.component.scss'],
  template: `
    <div class="container">
      <mat-card>
        <div class="control-panel">
          <mat-card class="control-panel-inputs">
            <mat-form-field appearance="fill">
              <mat-label>Długość ciągu</mat-label>
              <input matInput #length placeholder="np 20000" value="20000">
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>Liczba bluma</mat-label>
              <input matInput #blumNumber placeholder="np 2500013" value="50000057">
            </mat-form-field>
            <mat-form-field appearance="fill">
              <mat-label>losowa liczba n</mat-label>
              <input matInput #randomNumber placeholder="NWD z liczba bluma = 1" value="2500011">
            </mat-form-field>
          </mat-card>
          <button mat-raised-button color="primary"
                  (click)="callBbs()">Wygeneruj losowy ciag
          </button>
        </div>
        <app-series-visualization *ngIf="isResponse" [series]="series"></app-series-visualization>
      </mat-card>
    </div>

  `
})
export class GenerateBbsComponent implements OnInit {
  series: boolean[] = [];

  @ViewChild('length') length: ElementRef;
  @ViewChild('blumNumber') blumNumber: ElementRef;
  @ViewChild('randomNumber') randomNumber: ElementRef;

  constructor(private bbsGenerateService: BackendCommunicationService,
              l: ElementRef,
              b: ElementRef,
              r: ElementRef) {
    this.length = l;
    this.blumNumber = b;
    this.randomNumber = r;
  }

  get isResponse(): boolean {
    return this.series.length !== 0;
  }

  ngOnInit(): void {
  }

  callBbs(): void {
    this.bbsGenerateService.generateBbsSeries(
      this.length.nativeElement.value,
      this.blumNumber.nativeElement.value,
      this.randomNumber.nativeElement.value).subscribe(response => {
      this.series = response;
    })
  }

  public clearState(): void {
    this.series = [];
  }
}

