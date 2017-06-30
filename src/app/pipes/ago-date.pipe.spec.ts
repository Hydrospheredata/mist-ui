import { AgoDatePipe } from './ago-date.pipe';

describe('AgoDatePipe', () => {
  it('create an instance', () => {
    const pipe = new AgoDatePipe();
    expect(pipe).toBeTruthy();
  });
});
