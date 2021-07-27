import { INTERVAL_NUMBERS } from '../interval/data';
import { combine } from '../util';
import { CHORDS_SRC, ChordType } from './data';

/**
 * The entries have the form
 *   'a|b|c' => ChordType
 * where a, b, and c are intevals in semitones
 */
export const chordLookUp: Map<string, ChordType> = new Map();

// TODO Make this a bit more robust and maybe move it
// Initialize lookup
for (const chord of CHORDS_SRC) {
  const optionalNotes: number[] = [];
  const requiredNotes = chord.notes
    .split(' ')
    .filter((interval) => {
      const isRequired = interval[0] !== '(';
      if (!isRequired) {
        const intervalNumber = INTERVAL_NUMBERS.get(interval.slice(1, -1));
        if (intervalNumber !== undefined) optionalNotes.push(intervalNumber);
        else throw Error('Parsing chord dictionary failed.');
      }
      return isRequired;
    })
    .map((interval) => INTERVAL_NUMBERS.get(interval));

  if (requiredNotes.some((note) => note === undefined)) {
    throw Error('Parsing chord dictionary failed.');
  }

  // Find all possible combinations of optional notes
  const combinations: number[][] = combine(optionalNotes);
  if (combinations[0].length !== 0) {
    combinations.push([]); // Allow for none of the optional notes
  }

  for (const optionals of combinations) {
    const chordVariation = requiredNotes
      .concat(optionals)
      .sort((a, b) => a! - b!) // If any element is undefined an error is thrown above
      .join('|');
    if (chordLookUp.has(chordVariation)) {
      console.error(
        'Overwriting data in chord lookup!\nKey:',
        chordVariation,
        '\nNew:',
        chord,
        '\nOld:',
        chordLookUp.get(chordVariation)
      );
    }
    chordLookUp.set(chordVariation, chord);
  }
}
