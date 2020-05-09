import path from 'path';
import { promises as fs } from 'fs';

import genDiff from '../src/diff-generator.js';

const getAbsoluteFixturePath = (filename) => path.join(path.resolve(), '__fixtures__', filename);
const getRelativeFixturePath = (filename) => path.join('.', '__fixtures__', filename);

describe('diff building', () => {
  test.each([
    ['json', getRelativeFixturePath('before.json'), getAbsoluteFixturePath('after.json')],
    ['yaml', getRelativeFixturePath('before.yml'), getAbsoluteFixturePath('after.yml')],
    ['ini', getRelativeFixturePath('before.ini'), getAbsoluteFixturePath('after.ini')],
  ])('generate %s diff', async (_formatTitle, pathLeft, pathRight) => {
    const expectedDiff = await fs.readFile(getRelativeFixturePath('diff.stylish'), 'utf-8');

    const generatedDiff = genDiff(pathLeft, pathRight, 'stylish');
    expect(generatedDiff).toEqual(expectedDiff);
  });
});
