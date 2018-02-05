import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, q: string): any {
    if (!items || !field || !q) {
      return items;
    }
    return items.filter((item) => {
      let result = item[field].toLowerCase().indexOf(q.toLowerCase()) !== -1;
      return result;
    });
  }

}
