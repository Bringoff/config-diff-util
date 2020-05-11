import ini from 'ini';
import _ from 'lodash';
/**
 * By default 'ini' parser library treats everything as string and this doesn't look to be fixed
 * as related PRs are not merged for a couple of years. Number fields need to treated as numbers
 * to be consistent with other formats, so this function parse all fields and yields an object with
 * fields as number whenever it is possible.
 * Double equals use is intentional as it allows to check if the number was parsed correctly
 * and it still has the same value.
 * @param {object} rawParsed `ini.parse(...)` raw output.
 */
const convertFieldsToNumbersIfNeeded = (rawParsed) => {
  if (_.isObject(rawParsed)) {
    return Object.entries(rawParsed)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: convertFieldsToNumbersIfNeeded(v) }), {});
  }

  const possibleInt = parseInt(rawParsed, 10);
  const possibleFloat = parseFloat(rawParsed);
  // eslint-disable-next-line
  if (!_.isNaN(possibleInt) && possibleInt == rawParsed) {
    return possibleInt;
  }
  // eslint-disable-next-line
  if (!_.isNaN(possibleFloat) && possibleFloat == rawParsed) {
    return possibleFloat;
  }
  return rawParsed;
};

export default (iniContent) => {
  const parsed = ini.parse(iniContent);
  return convertFieldsToNumbersIfNeeded(parsed);
};
