import yaml from 'js-yaml';
import ini from 'ini';

const types = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.decode,
};

const parser = ([content, ext]) => {
  const parse = types[ext];
  return parse(content);
};

export default parser;
