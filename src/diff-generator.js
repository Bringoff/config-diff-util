import path from 'path';
import fs from 'fs';
import getConfigParser from './parsers/index.js';
import getDiffFormatter from './formatters/index.js';
import buildDiffAst from './diff-ast-creator.js';

const getFileExtensionFromPath = (filepath) => path.extname(filepath).substring(1);

export default (pathBefore, pathAfter, format) => {
  const resolvedPathLeft = path.resolve(process.cwd(), pathBefore);
  const extensionLeft = getFileExtensionFromPath(resolvedPathLeft);
  const resolvedPathRight = path.resolve(process.cwd(), pathAfter);
  const extensionRight = getFileExtensionFromPath(resolvedPathRight);

  const parsedContentBefore = getConfigParser(extensionLeft)(fs.readFileSync(resolvedPathLeft, 'utf8'));
  const parsedContentAfter = getConfigParser(extensionRight)(fs.readFileSync(resolvedPathRight, 'utf8'));

  const diffAst = buildDiffAst(parsedContentBefore, parsedContentAfter);
  const formatDiff = getDiffFormatter(format);
  return formatDiff(diffAst);
};
