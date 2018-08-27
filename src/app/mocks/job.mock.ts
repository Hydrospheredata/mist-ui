import { Job } from '@app/modules/shared/models';

export const mockJob: Job = new Job({
  jobId: 'jobId',
  status: 'stopped',
  context: 'context',
  createTime: new Date().getTime(),
  endTime: new Date().getTime(),
  startTime: new Date().getTime(),
  jobResult: 'result',
  params: 'params'
});

export const mockJobsList: Job[] = [mockJob];
