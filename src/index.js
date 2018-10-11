import _ from 'lodash';
import parser from './parsers';

const genDiff = (pathToFile1, pathToFile2) => {
  const [firstConfig, secondConfig] = [pathToFile1, pathToFile2].map(p => parser(p));
  const unitedKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));

  const diff = unitedKeys.map((uK) => {
    if (_.has(firstConfig, uK) && _.has(secondConfig, uK)) {
      if (firstConfig[uK] === secondConfig[uK]) {
        return `    ${uK}: ${firstConfig[uK]}`;
      }
      return `  + ${uK}: ${firstConfig[uK]}\n  - ${uK}: ${secondConfig[uK]}`;
    }
    if (_.has(firstConfig, uK)) {
      return `  - ${uK}: ${firstConfig[uK]}`;
    }
    return `  + ${uK}: ${secondConfig[uK]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
