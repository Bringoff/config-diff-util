import parseJson from './json-parser.js';
import parseYaml from './yaml-parser.js';
import parseIni from './ini-parser.js';

export default (fileExtension) => {
  switch (fileExtension) {
    case 'yml':
    case 'yaml':
      return parseYaml;
    case 'json':
      return parseJson;
    case 'ini':
      return parseIni;
    default:
      throw new Error('Unsupported config file');
  }
};
