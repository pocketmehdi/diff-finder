import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parser from './parsers';

const getParseData = filePath => [fs.readFileSync(filePath, 'utf-8'), path.extname(filePath)];

const isObj = arg => arg instanceof Object;
const stringify = (value) => {
  if (isObj(value)) {
    const objAtrrs = Object.keys(value).map(key => `${' '.repeat(4)}${key}: ${value[key]}`);
    return `{\n${objAtrrs.join('\n')}\n${' '.repeat(2)}}`;
  }
  return value;
};

const parse = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const node = {
    type: 'flat',
  };

  const ast = unitedKeys.map((uK) => {
    node.name = uK;

    if (_.has(obj1, uK) && _.has(obj2, uK)) {
      if (isObj(obj1[uK]) && isObj(obj2[uK])) {
        return { ...node, type: 'nested', children: [parse(obj1[uK], obj2[uK])] };
      }
      if (obj1[uK] === obj2[uK]) {
        return { ...node, status: 'equal', value1: obj1[uK] };
      }
      return {
        ...node, status: 'changed', value1: obj1[uK], value2: obj2[uK],
      };
    }
    if (_.has(obj1, uK)) {
      return { ...node, status: 'wasRemoved', value1: obj1[uK] };
    }
    return { ...node, status: 'wasAdded', value2: obj2[uK] };
  });

  return ast;
};

const renders = {
  equal: arg => `${' '.repeat(4)}${arg.name}: ${stringify(arg.value1)}`,
  changed: arg => `${' '.repeat(2)}+ ${arg.name}: ${stringify(arg.value1)}\n${' '.repeat(2)}- ${arg.name}: ${stringify(arg.value2)}`,
  wasRemoved: arg => `${' '.repeat(2)}- ${arg.name}: ${stringify(arg.value1)}`,
  wasAdded: arg => `${' '.repeat(2)}+ ${arg.name}: ${stringify(arg.value2)}`,
};

const render = (ast) => {
  const values = ast.map((node) => {
    if (node.type === 'nested') {
      return `${' '.repeat(4)}${node.name}: ${node.children.map(render).join('\n')}`;
    }
    return renders[node.status](node);
  });

  return `{\n${values.join('\n')}\n}`;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const [firstConfig, secondConfig] = [pathToFile1, pathToFile2].map(p => parser(getParseData(p)));

  return render(parse(firstConfig, secondConfig));
};

export default genDiff;
