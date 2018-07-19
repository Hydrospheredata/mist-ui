import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/operator/filter';

import { Job } from '@app/modules/shared/models';

@Pipe({
    name: 'jobStatusFilter',
    pure: false
})
export class JobStatusFilterPipe implements PipeTransform {

    transform(jobs: Job[], statusFilter: any): any {
        if (!jobs) { return undefined };
        return jobs.filter((job) => {
            let result = statusFilter.failed && job.isFailed();
            result = result || statusFilter.success && job.isFinished();
            result = result || statusFilter.running && job.isRunning();
            return result;
        });
    }

}
