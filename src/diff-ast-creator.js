import _ from 'lodash';

const isNestedStructure = (value) => _.isObject(value) && !_.isArray(value);

const buildDiffAst = (before, after) => {
  const beforeEntries = Object.entries(before);
  const afterAddedEntries = Object.entries(after)
    .filter(([key]) => !_.has(before, key));

  const commonDiffEvents = beforeEntries.map(([key, value]) => {
    if (!_.has(after, key)) {
      return { event: 'removed', key, value };
    }
    const afterValue = after[key];
    if (value === afterValue) return { event: 'unchanged', key, value };
    if (isNestedStructure(value) && isNestedStructure(afterValue)) {
      return { event: 'nestedModified', key, value: buildDiffAst(value, afterValue || {}) };
    }
    return {
      event: 'modified', key, value: afterValue, oldValue: value,
    };
  });

  const afterAddedEvents = afterAddedEntries.map(([key, value]) => ({ event: 'added', key, value }));
  return _.sortBy([...commonDiffEvents.flat(), ...afterAddedEvents], 'key');
};

export default buildDiffAst;
