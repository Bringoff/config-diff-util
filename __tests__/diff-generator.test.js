import path from 'path';

import genDiff from '../src/diff-generator';

const getAbsoluteFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getRelativeFixturePath = (filename) => path.join('.', '__fixtures__', filename);

test.each([
  ['json', getRelativeFixturePath('flat_left.json'), getAbsoluteFixturePath('flat_right.json')],
  ['yaml', getRelativeFixturePath('flat_left.yml'), getAbsoluteFixturePath('flat_right.yaml')],
  ['ini', getAbsoluteFixturePath('flat_left.ini'), getRelativeFixturePath('flat_right.ini')],
])('generate %s diff', (formatTitle, pathLeft, pathRight) => {
  const expectedDiff = `home: hexlet.io
- age: 25
+ age: 20
- ipAddress: 123.234.45.567
- admin: false
+ admin: true
+ expired: false`;

  const generatedDiff = genDiff(pathLeft, pathRight);
  expect(generatedDiff).toEqual(expectedDiff);
});
