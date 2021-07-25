import { InternalNoteNumber, normalizeInternalNote, Note } from '../note/Note';

// FIXME Not sure this is how this should be exported
export namespace Interval {
  /**
   * Returns the intervals, i.e. the distance from root to each
   * note with no regards to octaves
   */
  export function allFromInternalNoteNumbers(
    notes: InternalNoteNumber[],
    root: InternalNoteNumber
  ) {
    return notes.map((note) => normalizeInternalNote(note - root));
  }

  /**
   * Returns the intervals, i.e. the distance from root to each
   * note with no regards to octaves
   */
  export function allFromNotes(notes: Note[], root: Note) {
    return notes.map((note) =>
      normalizeInternalNote(note.internalNoteNumber - root.internalNoteNumber)
    );
  }
}
