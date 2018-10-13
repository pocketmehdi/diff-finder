#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format. Default: [object]', 'object')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstPath, secondPath) => console.log(genDiff(firstPath, secondPath, program.format)))
  .parse(process.argv);
