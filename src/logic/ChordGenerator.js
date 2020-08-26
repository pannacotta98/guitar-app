import ChordIntervals from './ChordIntervals';
import IntervalUtilities from './IntervalUtilities';
import { INTERVAL_NUMBERS } from './musicalData';
// here is some stuff that could be useful:
// - https://www.reddit.com/r/musictheory/comments/1jd894/looking_for_an_algorithm_that_generates_chord/

// TODO Limit to two or more notes?
export default class ChordGenerator {
  constructor() {
    // this.notes = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
    this.notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

    // E2–A2–D3–G3–B3–E4 <-- scientific pitch notation
    this.tuning = 'E2 A2 D3 G3 B3 E4'
      .split(' ')
      .map((note) => IntervalUtilities.toNoteNumber(note));
    console.log('tuning in numbers:', this.tuning);
    console.log(
      'tuning:',
      this.tuning.map((noteNumber) => IntervalUtilities.toNoteNameWithOctave(noteNumber))
    );
  }

  getAllChordsInFretRange(low, high) {
    const result = [];

    // The posible fret positions
    // TODO Make muted an option and handle low=0
    const frets = [0]; // Strings can always be left open
    for (let i = low; i < high; ++i) {
      /////////////////////////// TODO decide on if high is included or smth
      frets.push(i);
    }
    frets.push(null); // Strings can be muted

    // Find all combinations
    for (const s1 of frets) {
      for (const s2 of frets) {
        for (const s3 of frets) {
          for (const s4 of frets) {
            for (const s5 of frets) {
              for (const s6 of frets) {
                // Name chord and add to result
                const fingering = [s1, s2, s3, s4, s5, s6];
                // console.log(fingering, this.nameChord(fingering));
                result.push({
                  name: this.nameChord(fingering),
                  fingering: fingering,
                });
              }
            }
          }
        }
      }
    }

    return result;
  }

  nameChord(fingering) {
    const notesInChord = [];
    for (let i = 0; i < fingering.length; ++i) {
      if (fingering[i] !== null) {
        // if string is not muted
        notesInChord.push(this.tuning[i] + fingering[i]);
      }
    }

    const root = Math.min(...notesInChord);
    const rootName = IntervalUtilities.toNoteName(root);

    // Normalize notes to one octave and remove duplicates
    const notesInChordNormalized = notesInChord.map((note) =>
      IntervalUtilities.normalizeNote(note)
    );
    const notesInChordNormalizedNoDuplicates = [...new Set(notesInChordNormalized)];
    notesInChordNormalizedNoDuplicates.sort((a, b) => a - b);

    // Find frequency of each note
    var counts = {};
    for (let i = 0; i < notesInChordNormalized.length; i++) {
      const num = notesInChordNormalized[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // console.log('%cChordGenerator.js line:75 notesInChordNormalized', 'color: #26bfa5;', notesInChordNormalized);
    // console.log('%cChordGenerator.js line:75 counts', 'color: #26bfa5;', counts);

    const result = [];

    // Find chords rooted from rootName
    result.push(
      rootName +
        this.getChordQualityFromIntervals(
          IntervalUtilities.getIntervals(
            notesInChordNormalizedNoDuplicates,
            IntervalUtilities.normalizeNote(root)
          )
        )
    );

    // Find slash chords
    for (const buildNote of notesInChordNormalizedNoDuplicates) {
      if (IntervalUtilities.toNoteName(buildNote) === rootName) {
        continue;
      }

      result.push(
        IntervalUtilities.toNoteName(buildNote) +
          this.getChordQualityFromIntervals(
            IntervalUtilities.getIntervals(
              notesInChordNormalizedNoDuplicates.filter(
                (note) => !(note === IntervalUtilities.normalizeNote(root) && counts[note] === 1)
              ),
              buildNote
            )
          ) +
          '/' +
          rootName
      );
    }

    return result;
  }

  /**
   *
   * @param {??} intervals A list of the intervals between root and each note
   */
  getChordQualityFromIntervals(intervals) {
    // TODO order switcharoo
    const value = ChordIntervals.getInstance().chordLookUp.get(intervals.join('|'));

    if (value !== undefined) {
      // return value['Full Name'];
      return value.abbr[0];
    } else {
      console.warn(
        'Could not name chord with intervals:',
        intervals,
        intervals
          .map((i) => {
            for (const entry of INTERVAL_NUMBERS) {
              if (entry[1] === i) {
                return entry[0];
              }
            }
            return '?';
          })
          .join('|')
      );
      return '??';
    }
  }
}
