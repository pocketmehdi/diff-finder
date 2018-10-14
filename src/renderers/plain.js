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
};

const iter = (children, prevName) => {
  const extracted = children.map((node) => {
    if (node.type === 'nested') {
      return iter(_.flatten(node.children), resolveName(prevName, node.name));
    }
    return renders[node.status](node, prevName);
  });
  return extracted;
};

const render = (ast) => {
  const diff = iter(ast, '');
  return _.flattenDeep(diff).join('\n');
};

export default render;
