import path from 'path';
import fs from 'fs';
import getConfigParser from './parsers/parser-factory.js';
import getDiffFormatter from './formatters/index.js';
import buildDiffAst from './diff-ast-creator.js';

export default (pathBefore, pathAfter, format) => {
  const resolvedPathLeft = path.resolve(process.cwd(), pathBefore);
  const extensionLeft = path.extname(resolvedPathLeft);
  const resolvedPathRight = path.resolve(process.cwd(), pathAfter);
  const extensionRight = path.extname(resolvedPathRight);

  const parsedContentBefore = getConfigParser(extensionLeft)(fs.readFileSync(resolvedPathLeft, 'utf8'));
  const parsedContentAfter = getConfigParser(extensionRight)(fs.readFileSync(resolvedPathRight, 'utf8'));

  const diffAst = buildDiffAst(parsedContentBefore, parsedContentAfter);
  const formatDiff = getDiffFormatter(format);
  return formatDiff(diffAst);
};
