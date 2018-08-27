import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jobIdCut'
})
export class JobIdCutPipe implements PipeTransform {

    transform(value: string, args?: any): string {
        const result: Array<string> = value.split('-');

        return result[result.length - 1];
    }

}
