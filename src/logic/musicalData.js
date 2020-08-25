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
    abbr: ['', 'major', 'M'],
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 7',
    fullName: 'major seventh',
    abbr: ['maj<sup>7</sup>', '<sup>Δ7</sup>', 'ma7', 'M7', 'Δ'],
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 7 9',
    fullName: 'major ninth',
    abbr: ['maj<sup>9</sup>'],
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 7 (9) (11) 13',
    fullName: 'major thirteenth',
    abbr: ['maj<sup>13</sup>'],
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 6',
    fullName: 'sixth',
    abbr: ['<sup>6</sup>', '<sup>add6</sup>', '<sup>add13</sup>'],
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) 6 9',
    fullName: 'sixth/ninth',
    abbr: ['<sup>6/9</sup>', '<sup>69</sup>'],
    scale: 'Ionian',
  },
  {
    notes: '1 3 (5) (7) #11 (9,13..)', // fix
    fullName: 'lydian',
    abbr: ['maj<sup>♯4</sup>', '<sup>Δ♯4</sup>', '<sup>Δ♯11</sup>'],
    scale: 'Lydian',
  },
  {
    notes: '1 3 (5) (7) (9) b13 (11)',
    fullName: 'major seventh ♭6, or b13', // Detta känns väl inte helt huuundra
    abbr: ['maj7♭6', 'ma7♭6', 'M7♭6'],
    scale: 'Harmonic Maj',
  },
  // -- major add chords
  {
    notes: '1 3 (5) 9',
    fullName: 'major add 9', // Detta känns väl inte helt huuundra
    abbr: ['<sup>add9</sup>'],
    scale: '???',
  },
  // DOMINANT/SEVENTH
  // -- normal
  {
    notes: '1 3 (5) b7',
    fullName: 'dominant seventh',
    abbr: ['<sup>7</sup>', 'dom'],
    scale: 'Mixolydian',
  },
  {
    notes: '1 3 (5) b7 9',
    fullName: 'dominant ninth',
    abbr: ['<sup>9</sup>'],
    scale: 'Mixolydian',
  },
  {
    notes: '1 3 (5) b7 (9) 13',
    fullName: 'dominant thirteenth',
    abbr: ['<sup>13</sup>'],
    scale: 'Mixolydian',
  },
  {
    notes: '1 3 (5) b7 #11 (9,13..)',
    fullName: 'lydian dominant seventh',
    abbr: ['<sup>7♯11</sup>', '<sup>7♯4</sup>'],
    scale: 'Lydian Dominant (melodic minor 4th mode)',
  },
  // -- altered
  {
    notes: '1 3 (5) b7 b9 (#9,b5,6..)',
    fullName: 'dominant ♭9',
    abbr: ['<sup>7♭9</sup>'],
    scale: 'Half-tone/tone (8 note scale), 1/2 step/whole step Diminished scale, Octatonic scale.',
  },
  {
    notes: '1 3 (5) b7 #9',
    fullName: 'dominant ♯9',
    abbr: ['<sup>7♯9</sup>'],
    scale: 'Mixolydian with ♭3',
  },
  {
    notes: '1 3 b7 (b9) (b5,b6,#9..)',
    fullName: 'altered',
    abbr: ['alt7'],
    scale: 'Locrian ♭4 (super-locrian)',
  },
  // -- suspended
  {
    notes: '1 4 (5)',
    fullName: 'suspended 4th',
    abbr: ['sus<sup>4</sup>'],
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 2 (5)',
    fullName: 'suspended 2nd',
    abbr: ['sus<sup>2</sup>'],
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 2 4 (5) 6', // double check
    fullName: '6 suspended 2nd suspended 4th',
    abbr: ['<sup>6</sup>sus<sup>2</sup>sus<sup>4</sup>'],
    scale: '???',
  },
  {
    notes: '1 2 4 (5)', // double check
    fullName: 'suspended 2nd suspended 4th',
    abbr: ['sus<sup>2</sup>sus<sup>4</sup>'],
    scale: '???',
  },
  {
    notes: '1 4 (5) 6',
    fullName: '6 suspended 4th', // TODO
    abbr: ['<sup>6</sup>sus<sup>4</sup>'],
    scale: '???',
  },
  {
    notes: '1 4 (5) b7',
    fullName: 'suspended 4th seventh',
    abbr: ['<sup>7</sup>sus<sup>4</sup>'],
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 (5) b7 (9) 11', // DOuble checkk
    fullName: 'eleventh',
    abbr: ['<sup>11</sup>'],
    scale: 'Usually mixolydian',
  },
  {
    notes: '1 4 (5) b7 (9) 11', // DOuble checkk
    fullName: 'eleventh (special voicing)',
    abbr: ['<sup>11</sup>'],
    scale: 'Mixolydian',
  },
  {
    notes: '1 4 (5) b9',
    fullName: 'suspended 4th ♭9',
    abbr: ['<sup>♭9sus</sup>', 'phryg'],
    scale: 'Phrygian or phrygian ♯6',
  },
  // -- -- added
  {
    notes: '1 4 #5',
    fullName: 'suspended 4th #5',
    abbr: ['sus<sup>4#5</sup>'],
    scale: '???',
  },
  // MINOR
  {
    notes: '1 b3 5',
    fullName: 'minor',
    abbr: ['m', 'min', '-'],
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) b7',
    fullName: 'minor seventh',
    abbr: ['m<sup>7</sup>', 'mi7', 'min7', '-7'],
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) 7 (9, 13)',
    fullName: 'minor/major seventh',
    abbr: ['m<sup>maj7</sup>', 'm/ma7', 'm<sup>M7</sup>', '-<sup>Δ7</sup>', 'm<sup>Δ</sup>'],
    scale: 'Minor melodic (ascending)',
  },
  {
    notes: '1 b3 (5) 7 (9, b13)', // FIXME även övre kanske
    fullName: 'minor/major seventh',
    abbr: ['m<sup>maj7</sup>', 'm/ma7', 'm<sup>M7</sup>', '-<sup>Δ7</sup>', 'm<sup>Δ</sup>'],
    scale: 'Harmonic Minor',
  },
  {
    notes: '1 b3 (5) 6',
    fullName: 'minor sixth',
    abbr: ['m<sup>6</sup>'],
    scale: 'Dorian',
  },
  {
    notes: '1 b3 (5) b7 9',
    fullName: 'minor ninth',
    abbr: ['m<sup>9</sup>'],
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) b7 (9) 11',
    fullName: 'minor eleventh',
    abbr: ['m<sup>11</sup>'],
    scale: 'Dorian or aeolian',
  },
  {
    notes: '1 b3 (5) b7 (9) 13',
    fullName: 'minor thirteenth',
    abbr: ['m<sup>13</sup>'],
    scale: 'Dorian',
  },
  // -- -- added by me
  {
    notes: '1 b3 #5',
    fullName: 'minor #5',
    abbr: ['m<sup>#5</sup>'],
    scale: '???',
  },
  // -- add
  {
    notes: '1 2 b3 5',
    fullName: 'minor add 9',
    abbr: ['m<sup>add9</sup>'],
    scale: '???',
  },
  // DIMINISHED
  {
    notes: '1 b3 b5',
    fullName: 'diminished',
    abbr: ['dim', '°'],
    scale: 'Tone/Half-tone (8 note scale)',
  },
  {
    notes: '1 b3 b5 bb7',
    fullName: 'diminished seventh',
    abbr: ['dim7', '°', '°7'],
    scale: 'Tone/Half-tone (8 note scale)',
  },
  {
    notes: '1 b3 b5 b7 (b9 or 9,11,13..)',
    fullName: 'half-diminished',
    abbr: ['m7♭5', 'ø'],
    scale: 'Locrian or locrian ♯2',
  },
  // OTHER
  {
    notes: '1 5',
    fullName: 'fifth/power chord',
    abbr: ['<sup>5</sup>', '<sup>(no 3rd)</sup>'], // FIXME space breaks everything
    scale: 'None',
  },
  {
    notes: '1 3 #5',
    fullName: 'augmented',
    abbr: ['aug', '+'],
    scale: 'Whole tone (6 note scale)',
  },
  {
    notes: '1 3 #5 7',
    fullName: 'augmented seventh',
    abbr: ['<sup>7♯5</sup>', 'maj<sup>7+5</sup>'],
    scale: 'Whole tone (6 note scale)',
  },
];

export { INTERVAL_NUMBERS, CHORDS_SRC };
