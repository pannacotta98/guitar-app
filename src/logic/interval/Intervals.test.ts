import { Interval } from './Interval';

test('getIntervals with root = 0', () => {
  expect(Interval.allFromInternalNoteNumber([0, 1, 2, 3], 0)).toEqual([0, 1, 2, 3]);
});

test('getIntervals with intervals below the root', () => {
  expect(Interval.allFromInternalNoteNumber([0, 1, 2, 3], 1)).toEqual([11, 0, 1, 2]);
});

// test('getIntervals with intervals multiple octaves away', () => {
//   expect(Interval.allFromInternalNoteNumber(???)).toEqual(????);
// });
