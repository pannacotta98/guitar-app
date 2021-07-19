import { GuitarFingering } from '../chord/GuitarChord';
import { Tuning } from '../tuning/Tuning';
import { modulo } from '../util';

/**
 * The internal representation is described by a number counting upwards in halfsteps starting
 * with C0 represented by 0. So it begins like C0=0, C#0=1, D=2, ...
 */
export type InternalNoteNumber = number;

// TODO Think about some more elegant solution for this
const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

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
    return noteNames[normalizeInternalNote(this.internalNoteNumber)];
  }

  /**
   *
   * @returns the name of the note without octave, for example 'D'
   */
  nameWithOctave() {
    return `${this.nameWithoutOctave()}${Math.trunc(this.internalNoteNumber / noteNames.length)}`;
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
   * Create a `Note` from note name
   * @param noteName the name of the note including the octave, for example 'F#3'
   * @returns a new note
   */
  static fromName(noteName: string): Note {
    const name = noteName.slice(0, -1);
    const octave = parseInt(noteName.slice(-1));
    const number: InternalNoteNumber = octave * noteNames.length + noteNames.indexOf(name);
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
  // TODO I need to think about this i think
  // return noteNumber % noteNames.length;
  return modulo(noteNumber, noteNames.length);
}

// TODO Consider having double sharp/flats
// prettier-ignore
// eslint-disable-next-line
type NoteName =
  | 'C'
  | 'C#' | 'Db'
  | 'D'
  | 'D#' | 'Eb'
  | 'E'
  | 'F'
  | 'F#' | 'Gb'
  | 'G'
  | 'G#' | 'Ab'
  | 'A'
  | 'A#' | 'Bb'
  | 'B';
