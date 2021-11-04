import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class BbsGenerateService {

  constructor(private http: HttpClient) {
  }

  public generate(length: string, blumNumber: string, randomNumber: string): Observable<boolean[]> {
    const url = '/backend/get/length/' + length + '/blumNumber/' + blumNumber + '/randomNumber/' + randomNumber;
    return this.http.get<boolean[]>(url)
  }
}
