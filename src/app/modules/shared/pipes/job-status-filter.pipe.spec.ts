import { JobStatusFilterPipe } from '@app/modules/shared/pipes/job-status-filter.pipe';

describe('JobStatusFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new JobStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
