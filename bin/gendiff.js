#!/usr/bin/env node
import commander from 'commander';

const program = new commander.Command();
program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
