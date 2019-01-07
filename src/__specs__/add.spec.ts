import { add } from '../add';

describe('add', () => {
  test('add', () => {
    const result = add(1, 2);

    expect(result).toEqual(3);
  });
});
