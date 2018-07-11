import { JobStatusFilterPipe } from './job-status-filter.pipe';

describe('JobStatusFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new JobStatusFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
