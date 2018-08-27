import { ReplaceToBrNewLineCharPipe } from '@app/modules/shared/pipes/replace-to-br-new-line-char.pipe';

describe('ReplaceToBrNewLineCharPipe', () => {
  it('create an instance', () => {
    const pipe = new ReplaceToBrNewLineCharPipe();
    expect(pipe).toBeTruthy();
  });
});
