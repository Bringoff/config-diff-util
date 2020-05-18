import _ from 'lodash';

const isNestedStructure = (value) => _.isObject(value) && !_.isArray(value);

const buildDiffAst = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const commonKeys = _.intersection(keys1, keys2);
  const commonDiffEvents = commonKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (value1 === value2) return { type: 'unchanged', key, value: value1 };
    if (isNestedStructure(value1) && isNestedStructure(value2)) {
      return { type: 'nestedModified', key, value: buildDiffAst(value1, value2) };
    }
    return {
      type: 'modified', key, value: value2, oldValue: value1,
    };
  });
  const removedEvents = _.difference(keys1, commonKeys)
    .map((key) => ({ type: 'removed', key, value: data1[key] }));
  const addedEvents = _.difference(keys2, commonKeys)
    .map((key) => ({ type: 'added', key, value: data2[key] }));

  return _.sortBy([...commonDiffEvents.flat(), ...removedEvents, ...addedEvents], 'key');
};

export default buildDiffAst;
