import path from 'path';
import fs from 'fs';
import parser from './parsers';
import astBuilder from './astbuilder';
import render from './renderers';


const getParseData = filePath => [fs.readFileSync(filePath, 'utf-8'), path.extname(filePath)];

const genDiff = (pathToFile1, pathToFile2, format = 'object') => {
  const [firstConfig, secondConfig] = [pathToFile1, pathToFile2].map(p => parser(getParseData(p)));
  const ast = astBuilder(firstConfig, secondConfig);

  return render(ast, format);
};

export default genDiff;
