import fs from 'fs';
import path from 'path';

export default (inputPathLeft, inputPathRight) => {
  const resolvedPathLeft = path.resolve(process.cwd(), inputPathLeft);
  const resolvedPathRight = path.resolve(process.cwd(), inputPathRight);

  const jsonLeft = JSON.parse(fs.readFileSync(resolvedPathLeft, 'utf8'));
  const jsonRight = JSON.parse(fs.readFileSync(resolvedPathRight, 'utf8'));

  const leftEntries = Object.entries(jsonLeft);
  const rightExtraEntries = Object.entries(jsonRight).filter(([key]) => !jsonLeft[key]);

  const commonDiffLines = leftEntries.map(([key, value]) => {
    const rightValue = jsonRight[key];

    if (value === rightValue) return `${key}: ${value}`;

    const removedDiffPart = `- ${key}: ${value}`;
    if (!rightValue) {
      return removedDiffPart;
    }
    return `${removedDiffPart}\n+ ${key}: ${rightValue}`;
  });

  const rightExtraDiffLines = rightExtraEntries.map(([key, value]) => `+ ${key}: ${value}`);

  const totalDiffLines = [...commonDiffLines, ...rightExtraDiffLines];
  return totalDiffLines.join('\n');
};
