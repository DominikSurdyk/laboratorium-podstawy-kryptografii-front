import { StringToBoolPipe } from './string-to-bool.pipe';

describe('StringToBoolPipe', () => {
  it('create an instance', () => {
    const pipe = new StringToBoolPipe();
    expect(pipe).toBeTruthy();
  });
});
