import fs from 'fs';
import genDiff from '../src';

const pathBefore = '__tests__/__fixtures__/before';
const pathAfter = '__tests__/__fixtures__/after';
const resultObj = () => fs.readFileSync('__tests__/__fixtures__/result_obj.txt', 'utf-8');
const resultPlain = () => fs.readFileSync('__tests__/__fixtures__/result_plain.txt', 'utf-8');
const resultJson = () => fs.readFileSync('__tests__/__fixtures__/result_json.txt', 'utf-8');


test('gen diff for two files in object format', () => {
  expect(genDiff(`${pathBefore}.json`, `${pathAfter}.json`)).toEqual(resultObj());
  expect(genDiff(`${pathBefore}.yml`, `${pathAfter}.yml`)).toEqual(resultObj());
  expect(genDiff(`${pathBefore}.ini`, `${pathAfter}.ini`)).toEqual(resultObj());
});

test('gen diff for two files in plain format', () => {
  expect(genDiff(`${pathBefore}.json`, `${pathAfter}.json`, 'plain')).toEqual(resultPlain());
  expect(genDiff(`${pathBefore}.yml`, `${pathAfter}.yml`, 'plain')).toEqual(resultPlain());
  expect(genDiff(`${pathBefore}.ini`, `${pathAfter}.ini`, 'plain')).toEqual(resultPlain());
});

test('gen diff for two files in json format', () => {
  expect(genDiff(`${pathBefore}.json`, `${pathAfter}.json`, 'json')).toEqual(resultJson());
  expect(genDiff(`${pathBefore}.yml`, `${pathAfter}.yml`, 'json')).toEqual(resultJson());
  expect(genDiff(`${pathBefore}.ini`, `${pathAfter}.ini`, 'json')).toEqual(resultJson());
});
