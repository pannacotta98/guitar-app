import { IntervalUtilities } from './IntervalUtilities';

test('getIntervals with root = 0', () => {
  expect(IntervalUtilities.getIntervals([0, 1, 2, 3], 0)).toEqual([0, 1, 2, 3]);
});

test('getIntervals with intervals below the root', () => {
  expect(IntervalUtilities.getIntervals([0, 1, 2, 3], 1)).toEqual([11, 0, 1, 2]);
});

// test('getIntervals with intervals multiple octaves away', () => {
//   expect(IntervalUtilities.getIntervals(???)).toEqual(????);
// });
