import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const types = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

const parser = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath);
  const parse = types[extension];

  return parse(content);
};

export default parser;
