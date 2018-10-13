import objectRender from './object';
import plainRender from './plain';

const renderers = {
  object: objectRender,
  plain: plainRender,
};

const render = (ast, format) => renderers[format](ast);

export default render;
