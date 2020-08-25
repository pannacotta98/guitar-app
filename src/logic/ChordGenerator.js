import ChordIntervals from './ChordIntervals';
// here is some stuff that could be useful:
// - https://www.reddit.com/r/musictheory/comments/1jd894/looking_for_an_algorithm_that_generates_chord/

// TODO Limit to two or more notes?
export default class ChordGenerator {
  constructor() {
    // this.notes = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
    this.notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

    // E2–A2–D3–G3–B3–E4 <-- scientific pitch notation
    this.tuning = 'E2 A2 D3 G3 B3 E4'.split(' ').map((note) => this.toNoteNumber(note));
    console.log('tuning in numbers:', this.tuning);
    console.log(
      'tuning:',
      this.tuning.map((noteNumber) => this.toNoteNameWithOctave(noteNumber))
    );
  }

  getAllChordsInFretRange(low, high) {
    const result = [];

    // The posible fret positions
    // TODO Make muted an option and handle low=0
    const frets = [0]; // Strings can always be left open
    for (let i = low; i < high; ++i) {
      /////////////////////////// TODO decide on if high is included or smth
      frets.push(i);
    }
    frets.push(null); // Strings can be muted

    // Find all combinations
    for (const s1 of frets) {
      for (const s2 of frets) {
        for (const s3 of frets) {
          for (const s4 of frets) {
            for (const s5 of frets) {
              for (const s6 of frets) {
                // Name chord and add to result
                const fingering = [s1, s2, s3, s4, s5, s6];
                // console.log(fingering, this.nameChord(fingering));
                result.push({
                  name: this.nameChord(fingering),
                  fingering: fingering,
                });
              }
            }
          }
        }
      }
    }

    return result;
  }

  nameChord(fingering) {
    const notesInChord = [];
    for (let i = 0; i < fingering.length; ++i) {
      if (fingering[i] !== null) {
        // if string is not muted
        notesInChord.push(this.tuning[i] + fingering[i]);
      }
    }

    const root = Math.min(...notesInChord);
    const rootName = this.toNoteName(root);

    // Normalize notes to one octave and remove duplicates
    const notesInChordNormalized = notesInChord.map((note) => this.normalizeNote(note));
    const notesInChordNormalizedNoDuplicates = [...new Set(notesInChordNormalized)];
    notesInChordNormalizedNoDuplicates.sort((a, b) => a - b);

    // Find frequency of each note
    var counts = {};
    for (let i = 0; i < notesInChordNormalized.length; i++) {
      const num = notesInChordNormalized[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // console.log('%cChordGenerator.js line:75 notesInChordNormalized', 'color: #26bfa5;', notesInChordNormalized);
    // console.log('%cChordGenerator.js line:75 counts', 'color: #26bfa5;', counts);

    const result = [];

    // Find chords rooted from rootName
    result.push(
      rootName +
        this.getChordQualityFromIntervals(
          this.getIntervals(notesInChordNormalizedNoDuplicates, this.normalizeNote(root))
        )
    );

    // Find slash chords
    for (const buildNote of notesInChordNormalizedNoDuplicates) {
      if (this.toNoteName(buildNote) === rootName) {
        continue;
      }

      result.push(
        this.toNoteName(buildNote) +
          this.getChordQualityFromIntervals(
            this.getIntervals(
              notesInChordNormalizedNoDuplicates.filter(
                (note) => !(note === this.normalizeNote(root) && counts[note] === 1)
              ),
              buildNote
            )
          ) +
          '/' +
          rootName
      );
    }

    // const result = [];
    // for (const buildNote of notesInChordNormalized) {
    //   const quality = this.getChordQualityFromIntervals(
    //     this.getIntervals(notesInChordNormalized, this.normalizeNote(buildNote))
    //   );
    //   if (rootName === this.toNoteName(buildNote)) {
    //     result.push(this.toNoteName(buildNote) + quality);
    //   } else {
    //     result.push(this.toNoteName(buildNote) + quality + '/' + rootName);
    //   }
    // }
    // TODO Make it so bass note doesnt have to be part of chord quality
    return result;
  }

  /**
   *
   * @param {??} intervals A list of the intervals between each note
   */
  getChordQualityFromIntervals(intervals) {
    // TODO order switcharoo
    const value = ChordIntervals.getInstance().chordLookUp.get(intervals.join('|'));

    if (value !== undefined) {
      // return value['Full Name'];
      return value.abbr[0];
    } else {
      console.warn('Could not name chord with intervals:', intervals.join('|'));
      return '??';
    }
  }

  // Intervals compared to root note
  getIntervals(notes, root) {
    if (notes.length === 0) {
      console.log('ehm');
      return [];
    }
    // console.log('notes:', notes)

    const intervals = [0];
    const startIndex = notes.indexOf(root);

    // Loop through the notes with wraparound
    for (let i = (startIndex + 1) % notes.length; i !== startIndex; i = (i + 1) % notes.length) {
      let newInterval = notes[i] - root;
      // console.log(notes[i], '-', root, '=', newInterval);
      if (newInterval < 0) {
        newInterval += this.notes.length;
      }
      intervals.push(newInterval);
    }

    // console.log('| root:', root);
    // console.log('| notes:', notes, '-', notes.map(n => this.toNoteNameWithOctave(n)));
    // console.log('| intervals:', intervals);
    return intervals;
  }

  normalizeNote(noteNumber) {
    return noteNumber % this.notes.length;
  }

  toNoteName(number) {
    return this.notes[number % this.notes.length];
  }

  toNoteNameWithOctave(number) {
    return `${this.notes[number % this.notes.length]}${Math.trunc(number / this.notes.length)}`;
  }

  toNoteNumber(noteName) {
    const name = noteName.slice(0, -1);
    const octave = parseInt(noteName.slice(-1));
    return octave * this.notes.length + this.notes.indexOf(name);
  }
}

// // TODO Move or something
// function arrayEquals(a, b) {
//   return Array.isArray(a) &&
//     Array.isArray(b) &&
//     a.length === b.length &&
//     a.every((val, index) => val === b[index]);
// }

// // FOR TESTTING:
// var g = new ChordGenerator();
// // var hej = g.getAllChordsInFretRange(5, 8);
// // console.log('Chords generated:', hej.length);

// if (true) {
//   console.log('should be E major:     ', g.nameChord([0, 2, 2, 1, 0, 0]));
//   // console.log('should be G major:     ', g.nameChord([3, 2, 0, 0, 0, 3]));
//   console.log('should be E minor:     ', g.nameChord([0, 2, 2, 0, 0, 0]));
//   console.log('should be E minor7:    ', g.nameChord([0, 2, 2, 0, 3, 0]));
//   console.log('should be F minoradd9: ', g.nameChord([1, 3, 5, 1, 1, 1]));
//   // console.log('should be D major:     ', g.nameChord([null, null, 0, 2, 3, 2]));
//   console.log('should be D minor7:    ', g.nameChord([null, null, 0, 2, 1, 1]));
//   console.log('should be B sus2:      ', g.nameChord([null, 2, 4, 4, 2, 2]));
//   console.log('should be F lydian(?): ', g.nameChord([1, 3, 3, 2, 0, 0]));
//   console.log('should be G 11:        ', g.nameChord([null, 10, 10, 10, 10, 10]));
//   console.log('should be D / F#:      ', g.nameChord([2, 0, 0, 2, 3, 2]));
// }
