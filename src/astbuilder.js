import _ from 'lodash';

const isObj = arg => arg instanceof Object;

const getAst = (obj1, obj2) => {
  const unitedKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const ast = unitedKeys.map((uK) => {
    if (_.has(obj1, uK) && _.has(obj2, uK)) {
      if (isObj(obj1[uK]) && isObj(obj2[uK])) {
        return { name: uK, status: 'nested', children: getAst(obj1[uK], obj2[uK]) };
      }
      if (obj1[uK] === obj2[uK]) {
        return { name: uK, status: 'equal', value1: obj1[uK] };
      }
      return {
        name: uK, status: 'changed', value1: obj1[uK], value2: obj2[uK],
      };
    }
    if (_.has(obj1, uK)) {
      return { name: uK, status: 'wasRemoved', value1: obj1[uK] };
    }
    return { name: uK, status: 'wasAdded', value2: obj2[uK] };
  });

  return ast;
};

export default getAst;
