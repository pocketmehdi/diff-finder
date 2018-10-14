import objectRender from './object';
import plainRender from './plain';

const renderers = {
  object: objectRender,
  plain: plainRender,
  json: JSON.stringify,
};

const render = (ast, format) => renderers[format](ast);

export default render;
