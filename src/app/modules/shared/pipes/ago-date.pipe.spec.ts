import { AgoDatePipe } from '@app/modules/shared/pipes/ago-date.pipe';

describe('AgoDatePipe', () => {
  it('create an instance', () => {
    const pipe = new AgoDatePipe();
    expect(pipe).toBeTruthy();
  });
});
