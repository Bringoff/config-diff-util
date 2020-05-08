import path from 'path';

import genDiff from '../src/diff-generator';

const getAbsoluteFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getRelativeFixturePath = (filename) => path.join('.', '__fixtures__', filename);

test('generate diff absolute path', () => {
  const absolutePathLeft = getAbsoluteFixturePath('flat_left.json');
  const absolutePathRight = getAbsoluteFixturePath('flat_right.json');

  const expectedDiff = `host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true`;

  const generatedDiff = genDiff(absolutePathLeft, absolutePathRight);
  expect(generatedDiff).toEqual(expectedDiff);
});

test('generate diff relative path', () => {
  const relativePathLeft = getRelativeFixturePath('flat_left.json');
  const relativePathRight = getRelativeFixturePath('flat_right.json');

  const expectedDiff = `host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true`;

  const generatedDiff = genDiff(relativePathLeft, relativePathRight);
  expect(generatedDiff).toEqual(expectedDiff);
});
