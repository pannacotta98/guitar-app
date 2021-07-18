import { normalizeInternalNote } from './note/Note';

// // TODO Think about some more elegant solution for this
const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

export const IntervalUtilities = {
  /**
   * Returns the note normalized to octave 0
   * @param {number} noteNumber
   * @deprecated
   */
  normalizeNote(noteNumber) {
    return noteNumber % noteNames.length;
  },

  /**
   * Converts internal number representation to note name as letter (without octave)
   * @param {number} number
   * @deprecated
   */
  toNoteName(number) {
    return noteNames[this.normalizeNote(number)];
  },

  /**
   * Converts internal number representation to note name as letter with octave
   * @param {number} number
   * @deprecated
   */
  toNoteNameWithOctave(number) {
    return `${this.toNoteName(number)}${Math.trunc(number / noteNames.length)}`;
  },

  /**
   * Converts note name to internal number representation
   * @param {string} noteName The note name with octave
   * @deprecated
   */
  toNoteNumber(noteName) {
    const name = noteName.slice(0, -1);
    const octave = parseInt(noteName.slice(-1));
    return octave * noteNames.length + noteNames.indexOf(name);
  },

  /**
   * Returns the intervals, i.e. the distance from root to each
   * note with no regards to octaves
   */
  getIntervals(notes, root) {
    if (notes.length === 0) return [];
    return notes.map((note) =>
      // normalizeInternalNote(note.internalNoteNumber - root.internalNoteNumber)
      normalizeInternalNote(note - root)
    );
  },
};
