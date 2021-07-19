import { NOTE_NAMES } from '../musicalData';
import { ChordQuality } from './ChordQuality';
import { occurences } from '../util';
import { normalizeInternalNote, Note } from '../note/Note';
import { Tuning } from '../tuning/Tuning';
import { Interval } from '../interval/Interval';
// here is some stuff that could be useful:
// - https://www.reddit.com/r/musictheory/comments/1jd894/looking_for_an_algorithm_that_generates_chord/

// TODO Limit to two or more notes?
export class ChordGenerator {
  constructor() {
    this.notes = NOTE_NAMES;
  }

  // /** @deprecated */
  // getNotesInFingering(fingering) {
  //   const notesInChord = [];
  //   for (let i = 0; i < fingering.length; ++i) {
  //     // if string is not muted
  //     if (fingering[i] !== null) {
  //       notesInChord.push(this.tuning[i] + fingering[i]);
  //     }
  //   }
  //   return notesInChord;
  // }

  // nameChord(fingering) {
  //   if (fingering.every((s) => s === null)) return [];
  //   // console.log('Naming chord');
  //   // console.log(fingering);
  //   const notesInChord = Note.allFromFingering(fingering, Tuning.fromNotes('E2 A2 D3 G3 B3 E4'));
  //   // console.log(Tuning.fromNotes('E2 A2 D3 G3 B3 E4'));
  //   // console.log(notesInChord);

  //   const root = Note.lowest(notesInChord);
  //   const rootName = root.nameWithoutOctave();

  //   // // Normalize notes to one octave and remove duplicates
  //   // const notesInChordNormalized = notesInChord.map((note) =>
  //   //   IntervalUtilities.normalizeNote(note)
  //   // );
  //   // const notesInChordNormalizedNoDuplicates = [...new Set(notesInChordNormalized)];
  //   // notesInChordNormalizedNoDuplicates.sort((a, b) => a - b);

  //   const counts = occurences(
  //     notesInChord.map((note) => normalizeInternalNote(note.internalNoteNumber))
  //   );
  //   // console.log(counts);

  //   const result = [];
  //   // return result;

  //   // for (const buildNote of notesInChordNormalizedNoDuplicates) {
  //   //   const buildNoteIsRoot = IntervalUtilities.toNoteName(buildNote) === rootName;

  //   //   // TODO Remember to remove duplicate notes!

  //   //   let includedNotes = notesInChordNormalizedNoDuplicates;
  //   //   // If building from another note than the root, the root can be excluded
  //   //   // from the chord quality if it is not included in the rest of the voicing
  //   //   if (!buildNoteIsRoot) {
  //   //     includedNotes = notesInChordNormalizedNoDuplicates.filter(
  //   //       (note) => !(note === IntervalUtilities.normalizeNote(root) && counts.get(note) === 1)
  //   //     );
  //   //   }

  //   //   const chord = ChordQuality.fromIntervals(
  //   //     IntervalUtilities.getIntervals(includedNotes, buildNote)
  //   //   );

  //   //   if (chord !== null) {
  //   //     result.push({
  //   //       chordTypeInfo: chord,
  //   //       root: IntervalUtilities.toNoteName(buildNote),
  //   //       bass: buildNoteIsRoot ? null : rootName,
  //   //       // Non-slash chords should be preffered if similar complexity
  //   //       finalWeight: chord.weight + (buildNoteIsRoot ? 0 : 6),
  //   //     });
  //   //   }
  //   // }

  //   // result.sort((a, b) => a.finalWeight - b.finalWeight);

  //   // return result.map(
  //   //   (obj) => `${obj.root}${obj.chordTypeInfo.abbr[0]}${obj.bass !== null ? `/${obj.bass}` : ''}`
  //   // );
  // }

  // ----------------------------------------------------------------------------------------------

  nameChord(fingering) {
    if (fingering.every((s) => s === null)) return [];
    // console.log('Naming chord');
    // console.log(fingering);
    const notesInChord = Note.allFromFingering(fingering, Tuning.fromNotes('E2 A2 D3 G3 B3 E4'));
    // console.log(Tuning.fromNotes('E2 A2 D3 G3 B3 E4'));
    // console.log(notesInChord);

    const root = Note.lowest(notesInChord);
    const rootName = root.nameWithoutOctave();

    // Normalize notes to one octave and remove duplicates
    const notesInChordNormalized = notesInChord.map((note) =>
      normalizeInternalNote(note.internalNoteNumber)
    );
    const notesInChordNormalizedNoDuplicates = [...new Set(notesInChordNormalized)];
    notesInChordNormalizedNoDuplicates.sort((a, b) => a - b);

    const counts = occurences(notesInChordNormalized);

    const result = [];

    for (const buildNote of notesInChordNormalizedNoDuplicates) {
      const buildNoteIsRoot =
        Note.fromInternalNoteNumber(buildNote).nameWithoutOctave() === rootName;

      let includedNotes = notesInChordNormalizedNoDuplicates;
      // If building from another note than the root, the root can be excluded
      // from the chord quality if it is not included in the rest of the voicing
      if (!buildNoteIsRoot) {
        includedNotes = notesInChordNormalizedNoDuplicates.filter(
          (note) =>
            !(note === normalizeInternalNote(root.internalNoteNumber) && counts.get(note) === 1)
        );
      }

      const chord = ChordQuality.fromIntervals(
        Interval.allFromInternalNoteNumber(includedNotes, buildNote)
      );

      if (chord !== null) {
        result.push({
          chordTypeInfo: chord,
          root: Note.fromInternalNoteNumber(buildNote).nameWithoutOctave(),
          bass: buildNoteIsRoot ? null : rootName,
          // Non-slash chords should be preffered if similar complexity
          finalWeight: chord.weight + (buildNoteIsRoot ? 0 : 6),
        });
      }
    }

    result.sort((a, b) => a.finalWeight - b.finalWeight);

    return result.map(
      (obj) => `${obj.root}${obj.chordTypeInfo.abbr[0]}${obj.bass !== null ? `/${obj.bass}` : ''}`
    );
  }
}
