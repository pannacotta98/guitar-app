import { INTERVAL_NUMBERS, CHORDS_SRC } from './musicalData';
// https://en.wikibooks.org/wiki/Music_Theory/Complete_List_of_Chord_Patterns

// Singleton for now; might not be ideal in future
export default class ChordIntervals {
  static instance;
  constructor() {
    // Initialize lookup
    this.chordLookUp = new Map();
    for (const chord of CHORDS_SRC) {
      const optionalNotes = [];
      const requiredNotes = chord.notes.split(' ')
        .filter(interval => {
          const isRequired = interval[0] !== '(';
          if (!isRequired) {
            optionalNotes.push(INTERVAL_NUMBERS.get(interval.slice(1, -1)));
          }
          return isRequired;
        })
        .map(interval => INTERVAL_NUMBERS.get(interval));

      // Find all possible combinations of optional notes
      const combinations = combine(optionalNotes);
      if (combinations[0].length !== 0) {
        combinations.push([]); // Allow for none of the optional notes
      }

      for (const optionals of combinations) {
        this.chordLookUp.set(
          requiredNotes.concat(optionals).sort((a, b) => a - b).join('|'),
          chord
        );
      }

      console.log(chord.fullName, requiredNotes, optionalNotes);
    }

    // console.log(this.chordLookUp);
    console.log('size of chordLookUp:', this.chordLookUp.size);
    console.log('size of CHORD_SRC', CHORDS_SRC.length);

    // https://web.archive.org/web/20140418004051/http://dzone.com/snippets/calculate-all-combinations
    function combine(a) {
      var fn = function (n, src, got, all) {
        if (n === 0) { // changed == to ===
          if (got.length > 0) {
            all[all.length] = got;
          }
          return;
        }
        for (var j = 0; j < src.length; j++) {
          fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
      }
      var all = [];
      for (var i = 0; i < a.length; i++) {
        fn(i, a, [], all);
      }
      all.push(a);
      return all;
    }
  }

  static getInstance() {
    if (ChordIntervals.instance) {
      return ChordIntervals.instance;
    }
    ChordIntervals.instance = new ChordIntervals();
    return ChordIntervals.instance;
  }
}