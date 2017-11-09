import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/min/moment.min';
// import * as moment-timer from 'moment-timer';

@Pipe({
  name: 'agoDate'
})
export class AgoDatePipe implements PipeTransform {
  transform(time: number, args: any): any {
    let delta = new Date().getTime() - time;

    if (delta < 86400000) {
      return moment(time).fromNow();
    } else {
      return moment(time).format('MMM Do, h:mm')
    }


  }

}
