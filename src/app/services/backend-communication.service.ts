import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface CheckResult {
  passed: boolean;
  details: string;
}

export interface EncryptRequest {
  messageAscii: boolean[];
  messageString: string;
  messageFileName: string;
  key: boolean[];
  keyFileName: string
}

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicationService {

  private static readonly BACKEND_URL: string = '/api'

  constructor(private http: HttpClient) {
  }

  public generateBbsSeries(length: string, blumNumber: string, randomNumber: string): Observable<boolean[]> {
    const url = BackendCommunicationService.BACKEND_URL + '/get/length/' + length + '/blumNumber/' + blumNumber + '/randomNumber/' + randomNumber;
    return this.http.get<boolean[]>(url)
  }

  public testSeries(series: boolean[], testName: string): Observable<CheckResult> {
    const url = BackendCommunicationService.BACKEND_URL + '/check/test/' + testName;
    return this.http.post<CheckResult>(url, series);
  }

  public encryptStringMessage(request: EncryptRequest): Observable<boolean[]> {
    const url = BackendCommunicationService.BACKEND_URL + '/encrypt/string/';
    return this.http.post<boolean[]>(url, request);
  }

  public encryptAsciiMessage(request: EncryptRequest): Observable<boolean[]> {
    const url = BackendCommunicationService.BACKEND_URL + '/encrypt/ascii/';
    return this.http.post<boolean[]>(url, request);
  }
}
