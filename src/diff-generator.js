import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers/index.js';

const getConfigParser = (fileExtension) => {
  switch (fileExtension) {
    case '.yml':
    case '.yaml':
      return parsers.parseYaml;
    case '.json':
      return parsers.parseJson;
    default:
      throw new Error('Unsupported config file');
  }
};

export default (inputPathLeft, inputPathRight) => {
  const resolvedPathLeft = path.resolve(process.cwd(), inputPathLeft);
  const extensionLeft = path.extname(resolvedPathLeft);
  const resolvedPathRight = path.resolve(process.cwd(), inputPathRight);
  const extensionRight = path.extname(resolvedPathRight);

  const parsedContentLeft = getConfigParser(extensionLeft)(fs.readFileSync(resolvedPathLeft, 'utf8'));
  const parsedContentRight = getConfigParser(extensionRight)(fs.readFileSync(resolvedPathRight, 'utf8'));

  const leftEntries = Object.entries(parsedContentLeft);
  const rightExtraEntries = Object.entries(parsedContentRight)
    .filter(([key]) => !_.has(parsedContentLeft, key));

  const commonDiffLines = leftEntries.map(([key, value]) => {
    const removedDiffPart = `- ${key}: ${value}`;
    if (!_.has(parsedContentRight, key)) {
      return removedDiffPart;
    }
    const rightValue = parsedContentRight[key];

    if (value === rightValue) return `${key}: ${value}`;

    return `${removedDiffPart}\n+ ${key}: ${rightValue}`;
  });

  const rightExtraDiffLines = rightExtraEntries.map(([key, value]) => `+ ${key}: ${value}`);

  const totalDiffLines = [...commonDiffLines, ...rightExtraDiffLines];
  return totalDiffLines.join('\n');
};
