import _ from 'lodash';
import Entry from './ast-entry.js';

const isNestedStructure = (value) => _.isObject(value) && !_.isArray(value);

const buildDiffAst = (before, after) => {
  const beforeEntries = Object.entries(before);
  const afterAddedEntries = Object.entries(after)
    .filter(([key]) => !_.has(before, key));

  const commonDiffEvents = beforeEntries.map(([key, value]) => {
    if (!_.has(after, key)) {
      return new Entry('removed', key, value);
    }
    const afterValue = after[key];
    if (value === afterValue) return new Entry('unchanged', key, value);
    if (isNestedStructure(value) && isNestedStructure(afterValue)) {
      return new Entry('nestedModified', key, buildDiffAst(value, afterValue || {}));
    }
    return new Entry('modified', key, afterValue, value);
  });

  const afterAddedEvents = afterAddedEntries.map(([key, value]) => new Entry('added', key, value));
  return _.sortBy([...commonDiffEvents.flat(), ...afterAddedEvents], 'key');
};

export default buildDiffAst;
