import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParsingService {

  constructor() { }

  public toBooleanArray(series: string): boolean[] {
    var result: boolean[] = [];
    for (var i = 0; i < series.length; i++) {
      result.push(ParsingService.castToBool(series[i]))
    }
    return result;
  }

  public parseFilename(fileName: string): string {
    return fileName.substr(0, fileName.indexOf('.'));
  }

  private static castToBool(digit: string): boolean {
    return digit === '1';
  }
}
