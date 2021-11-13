import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BackendCommunicationService, CheckResult} from "../services/backend-communication.service";

@Component({
  selector: 'app-testing',
  styleUrls: ['./testing.component.scss'],
  template: `
    <div class="test-container">
      <div *ngFor="let test of testScenarios" >
        <mat-card class="test-case" >
          <button mat-raised-button color="primary" (click)="callTest(test)">{{test}}</button>
          <div [innerHTML]="getResponse(test)"></div>
        </mat-card>
      </div>
    </div>
  `
})
export class TestingComponent implements OnInit, OnChanges {
  public readonly BITS_TEST = 'bitsTest'
  public readonly SERIES_TEST = 'seriesTest'
  public readonly LONG_SERIES_TEST = 'longSeriesTest'
  public readonly POKER_TEST = 'pokerTest'
  public readonly COUNT_TEST = 'countTest'


  testResults = new Map();
  @Input()
  series: boolean[] = [];
  testScenarios: string[] = [this.COUNT_TEST, this.BITS_TEST, this.SERIES_TEST, this.LONG_SERIES_TEST, this.POKER_TEST];

  constructor(private backendCommunicationService: BackendCommunicationService) {
  }

  ngOnInit(): void {
  }

  callTest(testName: string): void {
    this.backendCommunicationService.testSeries(this.series, testName)
      .subscribe((response: CheckResult) => {
        this.testResults.set(testName, response);
      })
  }

  getResponse(testName: string): string {
    if (this.testResults.size == 0){
      return '';
    }
    const result = this.testResults.get(testName) as CheckResult;
    var response = 'Wynik testu: [' + result.passed + ']';
    if (result.details !== ''){
      response = response + ", Szczegóły: <br>" + result.details;;
    }
    return response;
  }

  passed(testName: string) : boolean {
    if (this.testResults.size == 0){
      return false;
    }
    const result = this.testResults.get(testName) as CheckResult;
    return result.passed;
  }

  failed(testName: string) : boolean {

    if (this.testResults.size == 0){
      return false;
    }
    const result = this.testResults.get(testName) as CheckResult;
    return !result.passed;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.testResults = new Map()
  }
}
