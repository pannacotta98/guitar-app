import { Note } from '../note/Note';
import { SCALES_SRC } from './data';

export class Scale {
  readonly notes: Note[];

  private constructor(notes: Note[]) {
    this.notes = notes;
  }

  static fromRootAndName(root: Note, name: string) {
    const notes: Note[] = [];
    const intervals = SCALES_SRC.get(name);

    if (intervals === undefined) return null;

    intervals.forEach((interval) => {
      if (interval === undefined) {
        console.error('Some interval could not be properly read for', name);
        return;
      }

      // TODO THIS WOULD NOT WORK CORRECTLY WITH THE OCTAVE THinG
      // !!!!
      notes.push(root.plusHalftones(interval));
    });

    return new Scale(notes);
  }

  static allNames() {
    return Array.from(SCALES_SRC.keys());
  }
}

