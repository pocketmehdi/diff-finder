import _ from 'lodash';

const stringify = (value, space) => {
  if (value instanceof Object) {
    const objAtrrs = Object.keys(value).map(key => `${space}${' '.repeat(8)}${key}: ${value[key]}`);
    return `{\n${objAtrrs.join('\n')}\n${space}${' '.repeat(4)}}`;
  }
  return `${value}`;
};

const renders = {
  equal: (arg, prevSpace) => `${prevSpace}${' '.repeat(4)}${arg.name}: ${stringify(arg.value1, prevSpace)}`,
  changed: (arg, prevSpace) => [`${prevSpace}${' '.repeat(2)}+ ${arg.name}: ${stringify(arg.value1, prevSpace)}`, `${prevSpace}${' '.repeat(2)}- ${arg.name}: ${stringify(arg.value2, prevSpace)}`],
  wasRemoved: (arg, prevSpace) => `${prevSpace}${' '.repeat(2)}- ${arg.name}: ${stringify(arg.value1, prevSpace)}`,
  wasAdded: (arg, prevSpace) => `${prevSpace}${' '.repeat(2)}+ ${arg.name}: ${stringify(arg.value2, prevSpace)}`,
  nested: (arg, prevSpace, fn) => `${prevSpace}${' '.repeat(4)}${arg.name}: {\n${fn(arg.children, `${prevSpace}${' '.repeat(4)}`).join('\n')}\n${prevSpace}${' '.repeat(4)}}`,
};

const iter = (children, prevSpace) => {
  const extracted = children.map(node => renders[node.status](node, prevSpace, iter));
  return _.flatten(extracted);
};

const render = (ast) => {
  const diff = iter(ast, '');
  return `{\n${diff.join('\n')}\n}`;
};

export default render;
