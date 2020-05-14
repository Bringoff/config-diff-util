import _ from 'lodash';

const isNestedStructure = (value) => _.isObject(value) && !_.isArray(value);

const buildDiffAst = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const commonKeys = _.intersection(beforeKeys, afterKeys);
  const commonDiffEvents = commonKeys.map((key) => {
    const beforeValue = before[key];
    const afterValue = after[key];
    if (beforeValue === afterValue) return { event: 'unchanged', key, value: beforeValue };
    if (isNestedStructure(beforeValue) && isNestedStructure(afterValue)) {
      return { event: 'nestedModified', key, value: buildDiffAst(beforeValue, afterValue) };
    }
    return {
      event: 'modified', key, value: afterValue, oldValue: beforeValue,
    };
  });
  const removedEvents = _.difference(beforeKeys, commonKeys)
    .map((key) => ({ event: 'removed', key, value: before[key] }));
  const addedEvents = _.difference(afterKeys, commonKeys)
    .map((key) => ({ event: 'added', key, value: after[key] }));

  return _.sortBy([...commonDiffEvents.flat(), ...removedEvents, ...addedEvents], 'key');
};

export default buildDiffAst;
