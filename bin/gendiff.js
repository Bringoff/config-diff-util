#!/usr/bin/env node
import commander from 'commander';

const program = new commander.Command();
program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

program.parse(process.argv);
