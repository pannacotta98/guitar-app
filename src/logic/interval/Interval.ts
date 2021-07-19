import { InternalNoteNumber, normalizeInternalNote } from '../note/Note';

export namespace Interval {
  /**
   * Returns the intervals, i.e. the distance from root to each
   * note with no regards to octaves
   */
  export function allFromInternalNoteNumber(notes: InternalNoteNumber[], root: InternalNoteNumber) {
    return notes.map((note) => normalizeInternalNote(note - root));
  }
}
