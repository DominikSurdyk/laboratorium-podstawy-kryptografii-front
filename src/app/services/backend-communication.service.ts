import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface CheckResult {
  passed: boolean;
  details: string;
}

export interface DecryptionBbsResponse {
  resultString: string;
  resultAscii: boolean[];
}

export interface EncryptBbsRequest {
  messageAscii: boolean[];
  messageString: string;
  messageFileName: string;
  key: boolean[];
  keyFileName: string
}

export interface AesEncryptRequest {
   message: string
   secret: string
   initVector: string
}

export interface AesEncryptResponse {
  message: string
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

  public encryptStringMessage(request: EncryptBbsRequest): Observable<boolean[]> {
    const url = BackendCommunicationService.BACKEND_URL + '/encrypt/string/';
    return this.http.post<boolean[]>(url, request);
  }

  public encryptAsciiMessage(request: EncryptBbsRequest): Observable<boolean[]> {
    const url = BackendCommunicationService.BACKEND_URL + '/encrypt/ascii/';
    return this.http.post<boolean[]>(url, request);
  }

  public decryptMessageToString(request: EncryptBbsRequest): Observable<DecryptionBbsResponse> {
    const url = BackendCommunicationService.BACKEND_URL + '/decrypt/string/';
    return this.http.post<DecryptionBbsResponse>(url, request);
  }

  public decryptMessageToAscii(request: EncryptBbsRequest): Observable<DecryptionBbsResponse> {
    const url = BackendCommunicationService.BACKEND_URL + '/decrypt/ascii/';
    return this.http.post<DecryptionBbsResponse>(url, request);
  }

  public encryptEbc(request: AesEncryptRequest): Observable<AesEncryptResponse> {
    const url = BackendCommunicationService.BACKEND_URL + 'aes/ecb/encrypt';
    return this.http.post<AesEncryptResponse>(url, request);
  }

  public encryptCbc(request: AesEncryptRequest): Observable<AesEncryptResponse> {
    const url = BackendCommunicationService.BACKEND_URL + 'aes/cbc/encrypt';
    return this.http.post<AesEncryptResponse>(url, request);
  }

  public encryptPbc(request: AesEncryptRequest): Observable<AesEncryptResponse> {
    const url = BackendCommunicationService.BACKEND_URL + 'aes/pbc/encrypt';
    return this.http.post<AesEncryptResponse>(url, request);
  }
}
