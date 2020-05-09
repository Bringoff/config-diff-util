import yaml from 'js-yaml';

export default (yamlContent) => yaml.safeLoad(yamlContent);
