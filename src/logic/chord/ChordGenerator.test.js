import { ChordGenerator } from './ChordGenerator';

const cg = new ChordGenerator();

test('Naming E major', () => {
  expect(cg.nameChord([0, 2, 2, 1, 0, 0])).toContain('E');
});

test('Naming E minor', () => {
  expect(cg.nameChord([0, 2, 2, 0, 0, 0])).toContain('Em');
});

test('Naming F minor add9', () => {
  expect(cg.nameChord([1, 3, 5, 1, 1, 1])).toContain('Fm<sup>add9</sup>');
});

test('Naming D/F#', () => {
  expect(cg.nameChord([2, 0, 0, 2, 3, 2])).toContain('D/F#');
});

test('Naming F/F#', () => {
  expect(cg.nameChord([2, 3, 3, 2, 1, 1])).toContain('F/F#');
});

// TODO These might be useful for unit test
// console.log('should be E major:     ', this.generator.nameChord([0, 2, 2, 1, 0, 0]));
// // console.log('should be G major:     ', g.nameChord([3, 2, 0, 0, 0, 3]));
// console.log('should be E minor:     ', this.generator.nameChord([0, 2, 2, 0, 0, 0]));
// console.log('should be E minor7:    ', this.generator.nameChord([0, 2, 2, 0, 3, 0]));
// console.log('should be F minoradd9: ', this.generator.nameChord([1, 3, 5, 1, 1, 1]));
// // console.log('should be D major:     ', g.nameChord([null, null, 0, 2, 3, 2]));
// console.log('should be D minor7:    ', this.generator.nameChord([null, null, 0, 2, 1, 1]));
// console.log('should be B sus2:      ', this.generator.nameChord([null, 2, 4, 4, 2, 2]));
// console.log('should be F lydian(?): ', this.generator.nameChord([1, 3, 3, 2, 0, 0]));
// console.log('should be G 11:        ', this.generator.nameChord([null, 10, 10, 10, 10, 10]));
// console.log('should be D / F#:      ', this.generator.nameChord([2, 0, 0, 2, 3, 2]));
