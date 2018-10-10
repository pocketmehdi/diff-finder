import fs from 'fs';
import genDiff from '../src/compare';

const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

test('compare two files', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toEqual(result);
});
