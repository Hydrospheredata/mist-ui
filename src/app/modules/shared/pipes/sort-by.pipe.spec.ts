import { SortByPipe } from '@app/modules/shared/pipes/sort-by.pipe';

describe('SortByPipe', () => {
  it('create an instance', () => {
    const pipe = new SortByPipe();
    expect(pipe).toBeTruthy();
  });
});
