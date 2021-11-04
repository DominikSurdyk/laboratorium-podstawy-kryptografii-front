import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToBool'
})
export class StringToBoolPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
