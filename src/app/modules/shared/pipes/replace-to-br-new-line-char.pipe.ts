import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceToBrNewLineChar'
})
export class ReplaceToBrNewLineCharPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace(/\\n/g, '<br>');
  }

}
