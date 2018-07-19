import { JobIdCutPipe } from '@app/modules/shared/pipes/job-id-cut.pipe';

describe('JobIdCutPipe', () => {
  it('create an instance', () => {
    const pipe = new JobIdCutPipe();
    expect(pipe).toBeTruthy();
  });
});
