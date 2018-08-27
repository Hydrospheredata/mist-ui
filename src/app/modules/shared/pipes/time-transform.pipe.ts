import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'timeTransform' })
export class TimeTransfromPipe implements PipeTransform {
    transform(value: number): string {
        return this.setDate(value);
    }

    private setDate(timestamp: number) {
        return moment(timestamp).format('MMM Do, kk:mm:ss.SSSS');
    }
}