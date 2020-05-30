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

const formatDiffAst = (ast, parentEntryName = '') => ast.map((entry) => {
  const formattingOptions = {
    unchanged: () => null,
    added: ({ key, value }) => `${formatPropertyLabel(key, parentEntryName)} was added with value: ${formatValue(value)}`,
    removed: ({ key }) => `${formatPropertyLabel(key, parentEntryName)} was deleted`,
    modified: ({ key, value, oldValue }) => `${formatPropertyLabel(key, parentEntryName)} was changed from ${formatValue(oldValue)} to ${formatValue(value)}`,
    nestedModified: ({ key, children }) => formatDiffAst(children,
      buildFullPropertyName(key, parentEntryName)),
  };
  const { type } = entry;
  return formattingOptions[type](entry);
}).filter((line) => line).join('\n');

export default formatDiffAst;
