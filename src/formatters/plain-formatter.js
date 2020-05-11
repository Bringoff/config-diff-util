import _ from 'lodash';

const buildFullPropertyName = (name, parentName = '') => {
  if (parentName.length === 0) return name;
  return `${parentName}.${name}`;
};

const formatPropertyLabel = (name, parentName = '') => `Property '${buildFullPropertyName(name, parentName)}'`;

const formatValue = (value) => {
  const valueNameByTypeMappers = {
    string: (v) => `'${v}'`,
    boolean: (v) => `${v}`,
    object: () => '[complex value]',
  };
  return valueNameByTypeMappers[typeof value](value);
};

const formatDiffAst = (ast, parentEntryName = '') => {
  if (_.isArray(ast)) return ast.map((entry) => formatDiffAst(entry, parentEntryName)).filter((line) => line).join('\n');
  const formattingOptions = {
    unchanged: () => null,
    added: ({ key, value }) => `${formatPropertyLabel(key, parentEntryName)} was added with value: ${formatValue(value)}`,
    removed: ({ key }) => `${formatPropertyLabel(key, parentEntryName)} was deleted`,
    modified: ({ key, value, oldValue }) => `${formatPropertyLabel(key, parentEntryName)} was changed from ${formatValue(oldValue)} to ${formatValue(value)}`,
    nestedModified: ({ key, value }) => formatDiffAst(value,
      buildFullPropertyName(key, parentEntryName)),
  };
  const { event } = ast;
  return formattingOptions[event](ast);
};

export default formatDiffAst;
