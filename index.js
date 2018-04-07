#!/usr/bin/env node

var path = require('path');
var shelljs = require('shelljs');
var fs = require('fs');
var process = require('process');
var args = process.argv;
var argc = args.length;
var argMode = null;
var name = 'oxygen-game';

for (var i = 1; i < argc; ++i) {
  var arg = args[i];
  if (!argMode) {
    if (arg === '--help' || arg === '-h') {
      console.log('Usage:\n\toxy-gen -n project-name\n');
      console.log('Params:');
      console.log('\t-v|--version\t- Version.');
      console.log('\t-h|--help\t- Help message.');
      console.log('\t-n|--name\t- Project name (NPM compatible: [a-zA-Z0-9-]+).');
      return;
    } else if (arg === '-v' || arg === '--version') {
      console.log(require(__dirname + '/package.json').version);
      return;
    } else if (arg === '--name' || arg === '-n') {
      argMode = 'name';
    }
  } else if (argMode === 'name') {
    name = arg;
    argMode = null;
  }
}

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
