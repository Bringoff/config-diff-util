import path from 'path';
import fs from 'fs';
import getConfigParser from './parsers/index.js';
import getDiffFormatter from './formatters/index.js';
import buildDiffAst from './diff-ast-creator.js';

const getFileExtensionFromPath = (filepath) => path.extname(filepath).substring(1);

export default (path1, path2, format) => {
  const resolvedPath1 = path.resolve(process.cwd(), path1);
  const extension1 = getFileExtensionFromPath(resolvedPath1);
  const resolvedPath2 = path.resolve(process.cwd(), path2);
  const extension2 = getFileExtensionFromPath(resolvedPath2);

  const parsedContent1 = getConfigParser(extension1)(fs.readFileSync(resolvedPath1, 'utf8'));
  const parsedContent2 = getConfigParser(extension2)(fs.readFileSync(resolvedPath2, 'utf8'));

  const diffAst = buildDiffAst(parsedContent1, parsedContent2);
  const formatDiff = getDiffFormatter(format);
  return formatDiff(diffAst);
};
