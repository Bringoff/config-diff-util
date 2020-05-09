import path from 'path';

import genDiff from '../src/diff-generator';

const getAbsoluteFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getRelativeFixturePath = (filename) => path.join('.', '__fixtures__', filename);

test('generate json diff', () => {
  const relativePathLeft = getRelativeFixturePath('flat_left.json');
  const absolutePathRight = getAbsoluteFixturePath('flat_right.json');


  const expectedDiff = `host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true`;

  const generatedDiff = genDiff(relativePathLeft, absolutePathRight);
  expect(generatedDiff).toEqual(expectedDiff);
});

test('generate yaml diff', () => {
  const relativePathLeft = getRelativeFixturePath('flat_left.yml');
  const absolutePathRight = getAbsoluteFixturePath('flat_right.yaml');
  const expectedDiff = `home: hexlet.io
- age: 25
+ age: 20
- ipAddress: 123.234.45.567
- admin: false
+ admin: true
+ expired: false`;

  const generatedDiff = genDiff(relativePathLeft, absolutePathRight);
  expect(generatedDiff).toEqual(expectedDiff);
});
