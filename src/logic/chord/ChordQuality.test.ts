import { ChordQuality } from './ChordQuality';

test('ChordQuality.fromIntervals with input intervals out of order', () => {
  const expectedValue: ChordQuality = {
    notes: '1 2 (5)',
    fullName: 'suspended 2nd',
    abbr: ['sus<sup>2</sup>'],
    scale: 'Usually mixolydian',
    weight: 12,
  };
  expect(ChordQuality.fromIntervals([2, 0, 7])).toEqual(expectedValue);
});
