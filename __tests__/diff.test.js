import path from 'path';
import { promises as fs } from 'fs';

import genDiff from '../src/diff-generator.js';

const getAbsoluteFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getRelativeFixturePath = (filename) => path.join('.', '__fixtures__', filename);

describe.each([
  ['stylish'],
  ['plain'],
  ['json'],
])('diff building', (formatterName) => {
  test.each([
    ['before.json', 'after.json'],
    ['before.yml', 'after.yml'],
    ['before.ini', 'after.ini'],
  ])('generate "%s - %s" diff', async (filenameBefore, filenameAfter) => {
    const pathLeft = getRelativeFixturePath(filenameBefore);
    const pathRight = getAbsoluteFixturePath(filenameAfter);
    const expectedDiff = await fs.readFile(getRelativeFixturePath(`diff.${formatterName}`), 'utf-8');

    const generatedDiff = genDiff(pathLeft, pathRight, formatterName);
    expect(generatedDiff).toEqual(expectedDiff);
  });
});
