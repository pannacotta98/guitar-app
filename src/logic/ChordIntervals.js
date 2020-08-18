// https://en.wikibooks.org/wiki/Music_Theory/Complete_List_of_Chord_Patterns

// Singleton for now; might not be ideal in future
class ChordIntervals {
  static instance;
  constructor() {
    const INTERVAL_NUMBERS = new Map([
      ['1' , 0 ],
      ['b2', 1 ], ['b9' , 1],
      ['2' , 2 ], ['9'  , 2],
      ['b3', 3 ], ['#9' , 3],
      ['3' , 4 ],
      ['4' , 5 ], ['11' , 5],
      ['b5', 6 ], ['#11', 6],
      ['5' , 7 ],
      ['b6', 8 ], ['b13', 8], ['#5' , 8],
      ['6' , 9 ], ['13' , 9], ['bb7', 9],
      ['b7', 10],
      ['7' , 11]
    ]);
    
    const CHORDS_SRC = [
      // MAJOR
      {
        "Notes": "1 3 5",
        "Full Name": "major",
        "Abbreviations": "  major M",
        "Scale/Mode": "Ionian"
      },
      {
        "Notes": "1 3 (5) 7",
        "Full Name": "major seventh",
        "Abbreviations": "maj7, Δ7, ma7, M7, Δ",
        "Scale/Mode": "Ionian"
      },
      {
        "Notes": "1 3 (5) 7 9",
        "Full Name": "major ninth",
        "Abbreviations": "maj9",
        "Scale/Mode": "Ionian"
      },
      {
        "Notes": "1 3 (5) 7 (9) (11) 13",
        "Full Name": "major thirteenth",
        "Abbreviations": "maj13",
        "Scale/Mode": "Ionian"
      },
      {
        "Notes": "1 3 (5) 6",
        "Full Name": "sixth",
        "Abbreviations": "6 add6 add13",
        "Scale/Mode": "Ionian"
      },
      {
        "Notes": "1 3 (5) 6 9",
        "Full Name": "sixth/ninth",
        "Abbreviations": "6/9 69",
        "Scale/Mode": "Ionian"
      },
      {
        "Notes": "1 3 (5) (7) #11 (9,13..)", // fix
        "Full Name": "lydian",
        "Abbreviations": "maj♯4 Δ♯4 Δ♯11",
        "Scale/Mode": "Lydian"
      },
      {
        "Notes": "1 3 (5) (7) (9) b13 (11)",
        "Full Name": "major seventh ♭6, or b13",
        "Abbreviations": "maj7♭6 ma7♭6 M7♭6",
        "Scale/Mode": "Harmonic Maj"
      },
      // DOMINANT/SEVENTH
      // -- normal
      {
        "Notes": "1 3 (5) b7",
        "Full Name": "dominant seventh",
        "Abbreviations": "7 dom",
        "Scale/Mode": "Mixolydian"
      },
      {
        "Notes": "1 3 (5) b7 9",
        "Full Name": "dominant ninth",
        "Abbreviations": "9",
        "Scale/Mode": "Mixolydian"
      },
      {
        "Notes": "1 3 (5) b7 (9) 13",
        "Full Name": "dominant thirteenth",
        "Abbreviations": "13",
        "Scale/Mode": "Mixolydian"
      },
      {
        "Notes": "1 3 (5) b7 #11 (9,13..)",
        "Full Name": "lydian dominant seventh",
        "Abbreviations": "7♯11 7♯4",
        "Scale/Mode": "Lydian Dominant (melodic minor 4th mode)"
      },
      // -- altered
      {
        "Notes": "1 3 (5) b7 b9 (#9,b5,6..)",
        "Full Name": "dominant ♭9",
        "Abbreviations": "7♭9",
        "Scale/Mode": "Half-tone/tone (8 note scale), 1/2 step/whole step Diminished scale, Octatonic scale."
      },
      {
        "Notes": "1 3 (5) b7 #9",
        "Full Name": "dominant ♯9",
        "Abbreviations": "7♯9",
        "Scale/Mode": "Mixolydian with ♭3"
      },
      {
        "Notes": "1 3 b7 (b9) (b5,b6,#9..)",
        "Full Name": "altered",
        "Abbreviations": "alt7",
        "Scale/Mode": "Locrian ♭4 (super-locrian)"
      },
      // -- suspended
      {
        "Notes": "1 4 (5)",
        "Full Name": "suspended 4th",
        "Abbreviations": "sus4",
        "Scale/Mode": "Usually mixolydian"
      },
      {
        "Notes": "1 2 (5)",
        "Full Name": "suspended 2nd",
        "Abbreviations": "sus2",
        "Scale/Mode": "Usually mixolydian"
      },
      {
        "Notes": "1 4 (5) 6",
        "Full Name": "6 suspended 4th", // TODO
        "Abbreviations": "6sus4",
        "Scale/Mode": "???"
      },
      {
        "Notes": "1 4 (5) b7",
        "Full Name": "suspended 4th seventh",
        "Abbreviations": "7sus4",
        "Scale/Mode": "Usually mixolydian"
      },
      {
        "Notes": "1 (5) b7 (9) 11", // DOuble checkk
        "Full Name": "eleventh",
        "Abbreviations": "11",
        "Scale/Mode": "Usually mixolydian"
      },
      {
        "Notes": "1 4 (5) b7 (9) 11",
        "Full Name": "eleventh (special voicing)",
        "Abbreviations": "11",
        "Scale/Mode": "Mixolydian"
      },
      {
        "Notes": "1 4 (5) b9",
        "Full Name": "suspended 4th ♭9",
        "Abbreviations": "♭9sus phryg",
        "Scale/Mode": "Phrygian or phrygian ♯6"
      },
      // -- -- added
      {
        "Notes": "1 4 #5",
        "Full Name": "suspended 4th #5",
        "Abbreviations": "sus4#5",
        "Scale/Mode": "???"
      },
      // MINOR
      {
        "Notes": "1 b3 5",
        "Full Name": "minor",
        "Abbreviations": "m min -",
        "Scale/Mode": "Dorian or aeolian"
      },
      {
        "Notes": "1 b3 (5) b7",
        "Full Name": "minor seventh",
        "Abbreviations": "m7 mi7 min7 -7",
        "Scale/Mode": "Dorian or aeolian"
      },
      {
        "Notes": "1 b3 (5) 7 (9, 13)",
        "Full Name": "minor/major seventh",
        "Abbreviations": "m/maj7 m/ma7 mM7 m/M7 -Δ7 mΔ",
        "Scale/Mode": "Minor melodic (ascending)"
      },
      {
        "Notes": "1 b3 (5) 7 (9, b13)", // FIXME även övre kanske
        "Full Name": "minor/major seventh",
        "Abbreviations": "m/ma7, m/maj7, mM7, m/M7, -Δ7, mΔ",
        "Scale/Mode": "Harmonic Minor"
      },
      {
        "Notes": "1 b3 (5) 6",
        "Full Name": "minor sixth",
        "Abbreviations": "m6",
        "Scale/Mode": "Dorian"
      },
      {
        "Notes": "1 b3 (5) b7 9",
        "Full Name": "minor ninth",
        "Abbreviations": "m9",
        "Scale/Mode": "Dorian or aeolian"
      },
      {
        "Notes": "1 b3 (5) b7 (9) 11",
        "Full Name": "minor eleventh",
        "Abbreviations": "m11",
        "Scale/Mode": "Dorian or aeolian"
      },
      {
        "Notes": "1 b3 (5) b7 (9) 13",
        "Full Name": "minor thirteenth",
        "Abbreviations": "m13",
        "Scale/Mode": "Dorian"
      },
      // -- -- added by me
      {
        "Notes": "1 b3 #5",
        "Full Name": "minor #5",
        "Abbreviations": "m#5",
        "Scale/Mode": "???"
      },
      // DIMINISHED
      {
        "Notes": "1 b3 b5",
        "Full Name": "diminished",
        "Abbreviations": "dim °",
        "Scale/Mode": "Tone/Half-tone (8 note scale)"
      },
      {
        "Notes": "1 b3 b5 bb7",
        "Full Name": "diminished seventh",
        "Abbreviations": "dim7 ° °7",
        "Scale/Mode": "Tone/Half-tone (8 note scale)"
      },
      {
        "Notes": "1 b3 b5 b7 (b9 or 9,11,13..)",
        "Full Name": "half-diminished",
        "Abbreviations": "m7♭5 ø",
        "Scale/Mode": "Locrian or locrian ♯2"
      },
      // OTHER
      {
        "Notes": "1 5",
        "Full Name": "fifth/power chord",
        "Abbreviations": "5 (no 3rd)",
        "Scale/Mode": "None"
      },
      {
        "Notes": "1 3 #5",
        "Full Name": "augmented",
        "Abbreviations": "aug +",
        "Scale/Mode": "Whole tone (6 note scale)"
      },
      {
        "Notes": "1 3 #5 7",
        "Full Name": "augmented seventh",
        "Abbreviations": "7♯5 maj7+5",
        "Scale/Mode": "Whole tone (6 note scale)"
      }
    ];

    // Initialize lookup
    this.chordLookUp = new Map();
    for (const chord of CHORDS_SRC) {
      const optionalNotes = [];
      const requiredNotes = chord.Notes.split(' ')
        .filter(interval => {
          const isRequired = interval[0] !== '(';
          if (!isRequired) {
            optionalNotes.push(INTERVAL_NUMBERS.get(interval.slice(1, -1)));
          }
          return isRequired;
        })
        .map(interval => INTERVAL_NUMBERS.get(interval));

      // Add all possible combinations of optional notes
      const combinations = combine(optionalNotes);
      if (combinations[0].length !== 0) {
        combinations.push([]); // Allow for none of the optional notes
      }

      for (const optionals of combinations) {
        this.chordLookUp.set(
          requiredNotes.concat(optionals).sort((a, b) => a - b).join('|'),
          chord
        )
      }

      console.log(chord['Full Name'], requiredNotes, optionalNotes);
    }

    // console.log(this.chordLookUp);
    console.log('size of chordLookUp:', this.chordLookUp.size);
    console.log('size of CHORD_SRC', CHORDS_SRC.length);

    // https://web.archive.org/web/20140418004051/http://dzone.com/snippets/calculate-all-combinations
    function combine(a) {
      var fn = function (n, src, got, all) {
        if (n == 0) {
          if (got.length > 0) {
            all[all.length] = got;
          }
          return;
        }
        for (var j = 0; j < src.length; j++) {
          fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
      }
      var all = [];
      for (var i = 0; i < a.length; i++) {
        fn(i, a, [], all);
      }
      all.push(a);
      return all;
    }
  }

  static getInstance() {
    if (ChordIntervals.instance) {
      return ChordIntervals.instance;
    }
    ChordIntervals.instance = new ChordIntervals();
    return ChordIntervals.instance;
  }
}

module.exports = ChordIntervals;