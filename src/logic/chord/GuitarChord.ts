import _ from 'lodash';
import { Note } from '../note/Note';
import { Tuning } from '../tuning/Tuning';
import { occurences } from '../util';
import { Chord } from './Chord';
import { Interval } from '../interval/Interval';
import { INTERVAL_NUMBERS } from '../interval/data';

/**
 * The placement of the fingers on the fretboard. `0` corresponds to an
 * open string, and `null` corresponds to a muted string. The strings are
 * given from low E to high E when standard tuning is used.
 */
export type GuitarFingering = [
  number | null, // E
  number | null, // A
  number | null, // D
  number | null, // G
  number | null, // B
  number | null // e
];

export class GuitarChord extends Chord {
  readonly fingering: GuitarFingering;
  readonly tuning: Tuning;

  private constructor(chord: Chord, fingering: GuitarFingering, tuning: Tuning) {
    // Making a Chord and then splitting it apart again probably isn't great
    // but I expect to get away with it hehe
    super(chord.root, chord.quality, chord.bass, chord.finalWeight);
    this.fingering = fingering;
    this.tuning = tuning;
  }

  getDetailedIntervals() {
    const intervals = this.quality.notes.split(' ');
    // The mapping depends on the chord quality to ensure correct enharmonic name
    const intervalSemitonesToNameMapping = new Map(
      intervals.map((n) => {
        // FIXME This parsing should probably be done somewhere else
        const name = n[0] !== '(' ? n : n.slice(1, -1);
        return [INTERVAL_NUMBERS.get(name), name];
      })
    );

    const intervalsFromFingering = Interval.allFromNotes(
      Note.allFromFingering(this.fingering, this.tuning),
      this.root
    );

    const counts = occurences(intervalsFromFingering);
    const result: { intervalName: string; count: number; intervalSemitones: number }[] = [];

    counts.forEach((count, intervalSemitones) => {
      let intervalName = intervalSemitonesToNameMapping.get(intervalSemitones);
      if (intervalName === undefined) {
        // JAG HAR NU UPPTÄCKT PROBLEMET:
        // basnoter finns ju inte nödvändigtvis i ackordet!
        // console.error(intervalSemitones, intervalSemitonesToNameMapping);
        // throw Error(`Interval error in guitar chord\n${this.fingering}\n${this.quality}
        // root: ${this.root}, bass: ${this.bass}`);
        intervalName = 'BASS';
      }
      result.push({ intervalName, /*note,*/ count, intervalSemitones });
    });

    result.sort((a, b) => a.intervalSemitones - b.intervalSemitones);
    // TODO Make chord intervals that are not in the voicing show up as well
    return result;
  }

  static allFromFingering(fingering: GuitarFingering, tuning: Tuning): GuitarChord[] {
    if (fingering.every((s) => s === null)) return [];

    const notesInChord = Note.allFromFingering(fingering, tuning);
    const root = Note.lowest(notesInChord).normalized();

    // Normalize notes to one octave and remove duplicates
    const notesNormalized = notesInChord.map((note) => note.normalized());
    const notesNormalizedNoDuplicates = _.uniqBy(
      notesNormalized,
      (note) => note.internalNoteNumber
    );

    const counts = occurences(notesNormalized.map((n) => n.internalNoteNumber));
    const result: Chord[] = [];

    // Try building from different notes to allow slash chords
    for (const buildNote of notesNormalizedNoDuplicates) {
      const chord = Chord.fromRootNotesAndBass(
        buildNote,
        root,
        notesNormalizedNoDuplicates,
        counts
      );
      if (chord !== null) result.push(chord);
    }

    result.sort((a, b) => a.finalWeight - b.finalWeight);

    return result.map((chord) => new GuitarChord(chord, fingering, tuning));
  }
}
