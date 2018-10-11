import _ from 'lodash';
import parser from './parsers';

const genDiff = (pathToFile1, pathToFile2) => {
  const [firstConfig, secondConfig] = [pathToFile1, pathToFile2].map(p => parser(p));

  const diffFirstSecond = Object.keys(firstConfig).reduce((acc, key) => {
    if (_.has(secondConfig, key)) {
      if (firstConfig[key] === secondConfig[key]) {
        return `${acc}\n    ${key}: ${firstConfig[key]}`;
      }
      return `${acc}\n  + ${key}: ${firstConfig[key]}\n  - ${key}: ${secondConfig[key]}`;
    }
    return `${acc}\n  - ${key}: ${firstConfig[key]}`;
  }, '{');

  const secondAgainstFirst = Object.keys(secondConfig).filter(key => !_.has(firstConfig, key));

  const diff = secondAgainstFirst.reduce((acc, key) => `${acc}\n  + ${key}: ${secondConfig[key]}`, diffFirstSecond);

  return `${diff}\n}`;
};

export default genDiff;
