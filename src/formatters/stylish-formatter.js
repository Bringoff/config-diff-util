import _ from 'lodash';

const buildPadding = (depth, operationSign = ' ') => `${' '.repeat(4 * depth - 2)}${operationSign} `;

const formatValue = (value, depth) => {
  if (!_.isObject(value)) return `${value}`;
  return [
    '{',
    // eslint-disable-next-line no-use-before-define
    ...Object.entries(value).map(([k, v]) => `${formatKeyValueLine(k, v, depth + 1)}`),
    `${buildPadding(depth)}}`,
  ].join('\n');
};

const formatKeyValueLine = (key, value, depth, operationSign) => {
  const paddingAndOperationSign = buildPadding(depth, operationSign);
  return `${paddingAndOperationSign}${key}: ${formatValue(value, depth)}`;
};

const formatDiff = (diffAst, depth = 0) => {
  if (_.isArray(diffAst)) {
    return diffAst.map((entry) => formatDiff(entry, depth + 1)).join('\n');
  }
  const formattingOptions = {
    unchanged: ({ key, value }) => `${formatKeyValueLine(key, value, depth)}`,
    added: ({ key, value }) => `${formatKeyValueLine(key, value, depth, '+')}`,
    removed: ({ key, value }) => `${formatKeyValueLine(key, value, depth, '-')}`,
    modified: ({ key, value, oldValue }) => `${formatKeyValueLine(key, value, depth, '+')}
${formatKeyValueLine(key, oldValue, depth, '-')}`,
    nestedModified: ({ key, value }) => [
      `${buildPadding(depth)}${key}: {`,
      `${formatDiff(value, depth)}`,
      `${buildPadding(depth)}}`,
    ].join('\n'),
  };

  return formattingOptions[diffAst.type](diffAst);
};

export default (ast) => ['{', formatDiff(ast, 0), '}'].join('\n');
