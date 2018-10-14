import stringify from '../utils';

const renders = {
  equal: arg => `${' '.repeat(4)}${arg.name}: ${stringify(arg.value1)}`,
  changed: arg => `${' '.repeat(2)}+ ${arg.name}: ${stringify(arg.value1)}\n${' '.repeat(2)}- ${arg.name}: ${stringify(arg.value2)}`,
  wasRemoved: arg => `${' '.repeat(2)}- ${arg.name}: ${stringify(arg.value1)}`,
  wasAdded: arg => `${' '.repeat(2)}+ ${arg.name}: ${stringify(arg.value2)}`,
};

const render = (ast) => {
  const values = ast.map((node) => {
    if (node.type === 'nested') {
      return `${' '.repeat(4)}${node.name}: ${render(node.children)}`;
    }
    return renders[node.status](node);
  });

  return `{\n${values.join('\n')}\n}`;
};

export default render;
