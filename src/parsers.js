import yaml from 'js-yaml';

const types = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

const parser = ([content, ext]) => {
  const parse = types[ext];
  return parse(content);
};

export default parser;
