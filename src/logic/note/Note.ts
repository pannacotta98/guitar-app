import { GuitarFingering } from '../chord/GuitarChord';
import { Tuning } from '../tuning/Tuning';
import { modulo } from '../util';
import { NOTE_NAMES } from './data';

/**
 * The internal representation is described by a number counting upwards in halfsteps starting
 * with C0 represented by 0. So it begins like C0=0, C#0=1, D=2, ...
 */
export type InternalNoteNumber = number;

/**
 *
 */
export class Note {
  readonly internalNoteNumber: InternalNoteNumber;

  protected constructor(internalNoteNumber: InternalNoteNumber) {
    this.internalNoteNumber = internalNoteNumber;
  }

  toString() {
    return this.nameWithOctave();
  }

  /**
   *
   * @returns the name of the note with octave, for example 'D4'
   */
  nameWithoutOctave() {
    return NOTE_NAMES[normalizeInternalNote(this.internalNoteNumber)];
  }

  /**
   *
   * @returns the name of the note without octave, for example 'D'
   */
  nameWithOctave() {
    return `${this.nameWithoutOctave()}${Math.trunc(this.internalNoteNumber / NOTE_NAMES.length)}`;
  }

  /**
   * Creates a new `Note` a number of semitones higher than the current `Note`
   * @param numHalftones the number of semitones to add
   * @returns the new `Note`
   */
  plusHalftones(numHalftones: number) {
    return new Note(this.internalNoteNumber + numHalftones);
  }

  /**
   *
   * @returns a new Note restricted to octave 0
   */
  normalized() {
    return new Note(normalizeInternalNote(this.internalNoteNumber));
  }

  /** Equals if same note in same octave */
  equals(otherNote: Note) {
    return this.internalNoteNumber === otherNote.internalNoteNumber;
  }

  /**
   * Create a `Note` from note name
   * @param noteName the name of the note including the octave, for example 'F#3'
   * @returns a new note
   */
  static fromName(noteName: string): Note {
    const name = noteName.slice(0, -1);
    const octave = parseInt(noteName.slice(-1));
    const number: InternalNoteNumber = octave * NOTE_NAMES.length + NOTE_NAMES.indexOf(name);
    return new Note(number);
  }

  static fromInternalNoteNumber(num: InternalNoteNumber) {
    return new Note(num);
  }

  static lowest(notes: Note[]): Note {
    let currentLowest = notes[0];
    // Skip first element; it is assigned above
    for (let i = 1; i < notes.length; ++i) {
      if (notes[i].internalNoteNumber < currentLowest.internalNoteNumber) {
        currentLowest = notes[i];
      }
    }
    return currentLowest;
  }

  static allFromFingering(fingering: GuitarFingering, tuning: Tuning): Note[] {
    const notesInChord: Note[] = [];
    for (let i = 0; i < fingering.length; ++i) {
      // if string is not muted
      const fretPos = fingering[i];
      if (fretPos !== null) {
        notesInChord.push(tuning.notesOnFretBoard[i][fretPos]);
      }
    }
    return notesInChord;
  }
}

/**
 * Returns the internal note number normalized to octave 0
 * @param noteNumber
 */
export function normalizeInternalNote(noteNumber: InternalNoteNumber): InternalNoteNumber {
  return modulo(noteNumber, NOTE_NAMES.length);
}
