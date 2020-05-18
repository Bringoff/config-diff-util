import _ from 'lodash';

const isNestedStructure = (value) => _.isObject(value) && !_.isArray(value);

const buildDiffAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const allKeys = _.union(keys1, keys2);
  const commonDiffEvents = allKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!keys1.includes(key)) return { type: 'added', key, value: value2 };
    if (!keys2.includes(key)) return { type: 'removed', key, value: value1 };
    if (value1 === value2) return { type: 'unchanged', key, value: value1 };
    if (isNestedStructure(value1) && isNestedStructure(value2)) {
      return { type: 'nestedModified', key, value: buildDiffAst(value1, value2) };
    }
    return {
      type: 'modified', key, value: value2, oldValue: value1,
    };
  });
  return _.sortBy([...commonDiffEvents.flat()], 'key');
};

export default buildDiffAst;
