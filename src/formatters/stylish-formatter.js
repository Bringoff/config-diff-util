import _ from 'lodash';

const formatValue = (value, depth) => {
  if (!_.isObject(value)) return `${value}`;
  return [
    '{',
    ...Object.entries(value).map(([k, v]) => `${' '.repeat(4 * (depth + 1))}${k}: ${v}`),
    `${' '.repeat(4 * depth)}}`,
  ].join('\n');
};

const formatDiff = (diffAst, depth = 0) => {
  if (_.isArray(diffAst)) {
    return diffAst.map((entry) => formatDiff(entry, depth + 1)).join('\n');
  }
  const formattingOptions = {
    unchanged: ({ key, value }) => `${' '.repeat(4 * depth)}${key}: ${formatValue(value, depth)}`,
    added: ({ key, value }) => `${' '.repeat(4 * depth - 2)}+ ${key}: ${formatValue(value, depth)}`,
    removed: ({ key, value }) => `${' '.repeat(4 * depth - 2)}- ${key}: ${formatValue(value, depth)}`,
    modified: ({ key, value, oldValue }) => `${' '.repeat(4 * depth - 2)}+ ${key}: ${formatValue(value, depth)}\n${' '.repeat(4 * depth - 2)}- ${key}: ${formatValue(oldValue, depth)}`,
    nestedModified: ({ key, value }) => [
      `${' '.repeat(4 * depth)}${key}: {`,
      `${formatDiff(value, depth)}`,
      `${' '.repeat(4 * depth)}}`,
    ].join('\n'),
  };

  return formattingOptions[diffAst.event](diffAst);
};

export default (ast) => ['{', formatDiff(ast, 0), '}'].join('\n');
