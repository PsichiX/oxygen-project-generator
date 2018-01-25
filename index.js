#!/usr/bin/env node

var path = require('path');
var shelljs = require('shelljs');
var fs = require('fs');
var process = require('process');
var name = process.argv[2] || process.argv[1] || 'oxygen-game';

console.log('Generate project: ' + name);

console.log('* copy templates...');
shelljs.ls('-A', path.join(__dirname, 'templates')).forEach(function(file){
  shelljs.cp('-R', path.join(__dirname, 'templates', file), './');
});

var contents = fs.readFileSync('./package.json', 'utf8');
contents = contents.replace('~oxygen-game~', name);
fs.writeFileSync('./package.json', contents);

console.log('* install dependencies...');
shelljs.exec('npm install --save', { silent: true });

console.log('* build project...');
shelljs.exec('npm run build', { silent: true });

console.log('* done!');
console.log('- `npm init` to provide project details');
console.log('- `npm run dev` to run dev server');
