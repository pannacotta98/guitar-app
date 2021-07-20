import { ChordQuality } from './ChordQuality';
import { increasingly, occurences } from '../util';
import { InternalNoteNumber, normalizeInternalNote, Note } from '../note/Note';
import { Tuning } from '../tuning/Tuning';
import { Interval } from '../interval/Interval';
import { GuitarFingering } from './GuitarChord';

// TODO Refactor to some better name among other things
export class ChordGenerator {
  nameChord(fingering: GuitarFingering) {
    if (fingering.every((s) => s === null)) return [];
    // TODO Use external tuning
    const notesInChord = Note.allFromFingering(fingering, Tuning.fromNotes('E2 A2 D3 G3 B3 E4'));

    const root = Note.lowest(notesInChord);
    const rootName = root.nameWithoutOctave();

    // Normalize notes to one octave and remove duplicates
    const notesNormalized: InternalNoteNumber[] = notesInChord.map((note) =>
      normalizeInternalNote(note.internalNoteNumber)
    );
    const notesNormalizedNoDuplicates = [...new Set(notesNormalized)];
    notesNormalizedNoDuplicates.sort(increasingly);

    const counts = occurences(notesNormalized);
    const result = [];

    for (const buildNote of notesNormalizedNoDuplicates) {
      const buildNoteIsRoot =
        Note.fromInternalNoteNumber(buildNote).nameWithoutOctave() === rootName;

      let includedNotes = notesNormalizedNoDuplicates;
      // If building from another note than the root, the root can be excluded
      // from the chord quality if it is not included in the rest of the voicing
      if (!buildNoteIsRoot) {
        includedNotes = notesNormalizedNoDuplicates.filter(
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
