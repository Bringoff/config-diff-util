import stylish from './stylish-formatter.js';
import plain from './plain-formatter.js';
import json from './json-formatter.js';

export default (format) => {
  const formatters = {
    stylish,
    plain,
    json,
  };
  return formatters[format];
};
