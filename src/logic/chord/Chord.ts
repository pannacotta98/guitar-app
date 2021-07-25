import { Interval } from '../interval/Interval';
import { InternalNoteNumber, Note } from '../note/Note';
import { ChordQuality } from './ChordQuality';

export class Chord {
  readonly root: Note;
  readonly quality: ChordQuality;
  readonly bass: Note;
  readonly finalWeight: number;

  protected constructor(root: Note, quality: ChordQuality, bass: Note, finalWeight: number) {
    this.root = root;
    this.quality = quality;
    this.bass = bass;
    this.finalWeight = finalWeight;
  }

  toString() {
    const root = this.root.nameWithoutOctave();
    const bass = !this.bass.equals(this.root) ? `/${this.bass.nameWithoutOctave()}` : '';
    return `${root}${this.quality}${bass}`;
  }

  getAllAlternativeChordNotations() {
    const root = this.root.nameWithoutOctave();
    const bass = !this.bass.equals(this.root) ? `/${this.bass.nameWithoutOctave()}` : '';
    return this.quality.abbr.map((abbr) => `${root}${abbr}${bass}`);
  }

  protected static fromRootNotesAndBass(
    root: Note,
    bass: Note,
    allNotesNoDuplicates: Note[],
    noteOccurences: Map<InternalNoteNumber, number>
  ) {
    const rootIsBass = root.equals(bass);

    // If building from another note than the root, the root can be excluded
    // from the chord quality if it is not included in the rest of the voicing
    if (!rootIsBass) {
      allNotesNoDuplicates = allNotesNoDuplicates.filter(
        (note) => !(note.equals(bass) && noteOccurences.get(note.internalNoteNumber) === 1)
      );
    }

    const intervals = Interval.allFromNotes(allNotesNoDuplicates, root);
    const quality = ChordQuality.fromIntervals(intervals);

    if (quality !== null) {
      return new Chord(root, quality, bass, quality.weight + (rootIsBass ? 0 : 6));
    }

    return null;
  }
}
