import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToString'
})
export class BoolToStringPipe implements PipeTransform {

  transform(series: boolean[]): string {
    var result ='';
    for (let value of series){
      if (value){
        result = result + '1';
      } else {
        result = result + '0';
      }
    }
    return result;
  }
}
