import { combine, increasingly } from './util';

test('combines correctly', () => {
  expect(combine([1, 2])).toEqual([[1], [2], [1, 2]]);
});

test('sorting increasingly', () => {
  const array = [1, 9, 4, 24, 2];
  array.sort(increasingly);
  expect(array).toEqual([1, 2, 4, 9, 24]);
});
