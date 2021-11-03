import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {BbsGenerateService} from "../services/bbs-generate.service";
import {Observable} from "rxjs";

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
              <input matInput #blumNumber placeholder="np 789" value="789">
            </mat-form-field>

            <mat-form-field appearance="fill">
              <mat-label>losowa liczba n</mat-label>
              <input matInput #randomNumber placeholder="NWD z liczba bluma = 1" value="238470123486127834">
            </mat-form-field>

          </mat-card>

          <button mat-raised-button color="primary"
                  (click)="callBbs()">Wygeneruj losowy ciag
          </button>
        </div>
        <app-series-visualization [series$]="series$"></app-series-visualization>
      </mat-card>
    </div>

  `
})
export class GenerateBbsComponent implements OnInit {
  series$: Observable<boolean[]> | undefined;
  @ViewChild('length') length: ElementRef ;
  @ViewChild('blumNumber') blumNumber: ElementRef;
  @ViewChild('randomNumber') randomNumber: ElementRef;
  constructor(private bbsGenerateService: BbsGenerateService,
              l: ElementRef,
              b: ElementRef,
              r: ElementRef) {
    this.length = l;
    this.blumNumber = b;
    this.randomNumber = r;
  }

  ngOnInit(): void {
  }

  callBbs(): void {
    this.series$ = this.bbsGenerateService.generate(
      this.length.nativeElement.value,
      this.blumNumber?.nativeElement.value,
      this.randomNumber?.nativeElement.value);
  }
}