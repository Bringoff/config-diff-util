import stylish from './stylish-formatter.js';

export default (format) => {
  const formatters = {
    stylish,
  };
  return formatters[format];
};
