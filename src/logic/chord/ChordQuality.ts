import { INTERVAL_NUMBERS } from '../interval/data';
import { increasingly } from '../util';
import { chordLookUp } from './ChordIntervals';
import { ChordType } from './data';

export class ChordQuality {
  readonly notes: string;
  readonly fullName: string;
  readonly abbr: string[];
  readonly scale: string;
  readonly weight: number;

  private constructor(chordType: ChordType) {
    this.notes = chordType.notes;
    this.fullName = chordType.fullName;
    this.abbr = chordType.abbr;
    this.scale = chordType.scale;
    this.weight = chordType.weight;
  }

  toString() {
    return this.abbr[0];
  }

  /**
   * ...
   * @param {number[]} intervals A list of the intervals in half-notes between
   * the root and each note. Ex: [0, 2, 4, 7] where 0 is the root
   */
  static fromIntervals(intervals: number[]) {
    const sortedIntervals = [...intervals].sort(increasingly);
    const mapKey = sortedIntervals.join('|');
    const value = chordLookUp.get(mapKey);
    if (value !== undefined) {
      return new ChordQuality(value);
    }

    console.log(
      'Could not name chord with intervals:',
      sortedIntervals,
      sortedIntervals
        .map((i) => {
          for (const [key, value] of INTERVAL_NUMBERS) {
            if (value === i) return key;
          }
          return '?';
        })
        .join('|')
    );
    return null;
  }
}
