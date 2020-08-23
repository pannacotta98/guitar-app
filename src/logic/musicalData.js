// prettier-ignore
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
    notes: '1 3 5',
    fullName: 'major',
    abbr: ' major M', // space is intentional
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 7',
    fullName: 'major seventh',
    abbr: 'maj7, Δ7, ma7, M7, Δ',
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 7 9',
    fullName: 'major ninth',
    abbr: 'maj9',
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 7 (9) (11) 13',
    fullName: 'major thirteenth',
    abbr: 'maj13',
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 6',
    fullName: 'sixth',
    abbr: '6 add6 add13',
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 6 9',
    fullName: 'sixth/ninth',
    abbr: '6/9 69',
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) (7) #11 (9,13..)', // fix
    fullName: 'lydian',
    abbr: 'maj♯4 Δ♯4 Δ♯11',
    scale: 'Lydian',
  },
  {
    notes: '1 3 (5) (7) (9) b13 (11)',
    fullName: 'major seventh ♭6, or b13',
    abbr: 'maj7♭6 ma7♭6 M7♭6',
    scale: 'Harmonic Maj',
  },
  // DOMINANT/SEVENTH
  // -- normal
  {
    notes: '1 3 (5) b7',
    fullName: 'dominant seventh',
    abbr: '7 dom',
    scale: 'Mixolydian',
  },
  {
    notes: '1 3 (5) b7 9',
    fullName: 'dominant ninth',
    abbr: '9',
    scale: 'Mixolydian',
  },
  {
    notes: '1 3 (5) b7 (9) 13',
    fullName: 'dominant thirteenth',
    abbr: '13',
    scale: 'Mixolydian',
  },
  {
    notes: '1 3 (5) b7 #11 (9,13..)',
    fullName: 'lydian dominant seventh',
    abbr: '7♯11 7♯4',
    scale: 'Lydian Dominant (melodic minor 4th mode)',
  },
  // -- altered
  {
    notes: '1 3 (5) b7 b9 (#9,b5,6..)',
    fullName: 'dominant ♭9',
    abbr: '7♭9',
    scale: 'Half-tone/tone (8 note scale), 1/2 step/whole step Diminished scale, Octatonic scale.',
  },
  {
    notes: '1 3 (5) b7 #9',
    fullName: 'dominant ♯9',
    abbr: '7♯9',
    scale: 'Mixolydian with ♭3',
  },
  {
    notes: '1 3 b7 (b9) (b5,b6,#9..)',
    fullName: 'altered',
    abbr: 'alt7',
    scale: 'Locrian ♭4 (super-locrian)',
  },
  // -- suspended
  {
    notes: '1 4 (5)',
    fullName: 'suspended 4th',
    abbr: 'sus4',
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 2 (5)',
    fullName: 'suspended 2nd',
    abbr: 'sus2',
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 2 4 (5)', // double check
    fullName: 'suspended 2nd suspended 4th',
    abbr: 'sus2sus4',
    scale: '???',
  },
  {
    notes: '1 4 (5) 6',
    fullName: '6 suspended 4th', // TODO
    abbr: '6sus4',
    scale: '???',
  },
  {
    notes: '1 4 (5) b7',
    fullName: 'suspended 4th seventh',
    abbr: '7sus4',
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 (5) b7 (9) 11', // DOuble checkk
    fullName: 'eleventh',
    abbr: '11',
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 4 (5) b7 (9) 11',
    fullName: 'eleventh (special voicing)',
    abbr: '11',
    scale: 'Mixolydian',
  },
  {
    notes: '1 4 (5) b9',
    fullName: 'suspended 4th ♭9',
    abbr: '♭9sus phryg',
    scale: 'Phrygian or phrygian ♯6',
  },
  // -- -- added
  {
    notes: '1 4 #5',
    fullName: 'suspended 4th #5',
    abbr: 'sus4#5',
    scale: '???',
  },
  // MINOR
  {
    notes: '1 b3 5',
    fullName: 'minor',
    abbr: 'm min -',
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) b7',
    fullName: 'minor seventh',
    abbr: 'm7 mi7 min7 -7',
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) 7 (9, 13)',
    fullName: 'minor/major seventh',
    abbr: 'm/maj7 m/ma7 mM7 m/M7 -Δ7 mΔ',
    scale: 'Minor melodic (ascending)',
  },
  {
    notes: '1 b3 (5) 7 (9, b13)', // FIXME även övre kanske
    fullName: 'minor/major seventh',
    abbr: 'm/ma7, m/maj7, mM7, m/M7, -Δ7, mΔ',
    scale: 'Harmonic Minor',
  },
  {
    notes: '1 b3 (5) 6',
    fullName: 'minor sixth',
    abbr: 'm6',
    scale: 'Dorian',
  },
  {
    notes: '1 b3 (5) b7 9',
    fullName: 'minor ninth',
    abbr: 'm9',
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) b7 (9) 11',
    fullName: 'minor eleventh',
    abbr: 'm11',
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) b7 (9) 13',
    fullName: 'minor thirteenth',
    abbr: 'm13',
    scale: 'Dorian',
  },
  // -- -- added by me
  {
    notes: '1 b3 #5',
    fullName: 'minor #5',
    abbr: 'm#5',
    scale: '???',
  },
  // -- add
  {
    notes: '1 2 b3 5',
    fullName: 'minor add 9',
    abbr: 'madd9',
    scale: '???',
  },
  // DIMINISHED
  {
    notes: '1 b3 b5',
    fullName: 'diminished',
    abbr: 'dim °',
    scale: 'Tone/Half-tone (8 note scale)',
  },
  {
    notes: '1 b3 b5 bb7',
    fullName: 'diminished seventh',
    abbr: 'dim7 ° °7',
    scale: 'Tone/Half-tone (8 note scale)',
  },
  {
    notes: '1 b3 b5 b7 (b9 or 9,11,13..)',
    fullName: 'half-diminished',
    abbr: 'm7♭5 ø',
    scale: 'Locrian or locrian ♯2',
  },
  // OTHER
  {
    notes: '1 5',
    fullName: 'fifth/power chord',
    abbr: '5 (no 3rd)',
    scale: 'None',
  },
  {
    notes: '1 3 #5',
    fullName: 'augmented',
    abbr: 'aug +',
    scale: 'Whole tone (6 note scale)',
  },
  {
    notes: '1 3 #5 7',
    fullName: 'augmented seventh',
    abbr: '7♯5 maj7+5',
    scale: 'Whole tone (6 note scale)',
  },
];

export { INTERVAL_NUMBERS, CHORDS_SRC };
