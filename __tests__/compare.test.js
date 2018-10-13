import fs from 'fs';
import genDiff from '../src';

const result = () => fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');

test('compare two json files', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toEqual(result());
});

test('compare two yaml files', () => {
  expect(genDiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml')).toEqual(result());
});

test('compare two ini files', () => {
  expect(genDiff('__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini')).toEqual(result());
});

const resultNested = () => fs.readFileSync('__tests__/__fixtures__/result_nested.txt', 'utf-8');

test('compare two nested json files', () => {
  expect(genDiff('__tests__/__fixtures__/before_nested.json', '__tests__/__fixtures__/after_nested.json')).toEqual(resultNested());
});

test('compare two nested yaml files', () => {
  expect(genDiff('__tests__/__fixtures__/before_nested.yml', '__tests__/__fixtures__/after_nested.yml')).toEqual(resultNested());
});

test('compare two nested ini files', () => {
  expect(genDiff('__tests__/__fixtures__/before_nested.ini', '__tests__/__fixtures__/after_nested.ini')).toEqual(resultNested());
});
