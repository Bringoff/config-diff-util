import stylish from './stylish-formatter.js';
import plain from './plain-formatter.js';

export default (format) => {
  const formatters = {
    stylish,
    plain,
  };
  return formatters[format];
};
