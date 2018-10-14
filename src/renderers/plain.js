import _ from 'lodash';


const complexObj = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return value;
};

const resolveName = (prev, next) => {
  if (prev === '') {
    return `${next}`;
  }
  return `${prev}.${next}`;
};

const renders = {
  equal: (arg, parentName) => `Property '${resolveName(parentName, arg.name)}' unchanded with value: ${complexObj(arg.value1)}`,
  changed: (arg, parentName) => `Property '${resolveName(parentName, arg.name)}' was changed from ${complexObj(arg.value1)} to ${complexObj(arg.value2)}`,
  wasRemoved: (arg, parentName) => `Property '${resolveName(parentName, arg.name)}' was removed`,
  wasAdded: (arg, parentName) => `Property '${resolveName(parentName, arg.name)}' was added with value: ${complexObj(arg.value2)}`,
  nested: (arg, parentName, fn) => fn(arg.children, resolveName(parentName, arg.name)),
};

const render = (ast, parentName = '') => {
  const diff = ast.map(node => renders[node.status](node, parentName, render));
  return _.flatten(diff).join('\n');
};

export default render;
