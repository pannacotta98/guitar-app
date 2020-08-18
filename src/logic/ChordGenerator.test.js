import ChordGenerator from './ChordGenerator';

var g = new ChordGenerator();

test('Correctly identifies major and minor chords', () => {
  expect(g.nameChord([0, 2, 2, 1, 0, 0])).toBe('E');
  // TODO Add test cases
})