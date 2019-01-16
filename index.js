#!/usr/bin/env node
const parseFile = require('./mole').parseFile;

process.stdout.write(parseFile(process.argv[2])+'\n');
