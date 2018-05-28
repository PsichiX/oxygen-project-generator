#!/usr/bin/env node

var path = require('path');
var shelljs = require('shelljs');
var fs = require('fs');
var process = require('process');
var args = process.argv;
var argc = args.length;
var argMode = null;
var name = 'oxygen-game';
var lib = false;
var doNotInstall = false;
var doNotBuild = false;

for (var i = 1; i < argc; ++i) {
  var arg = args[i];
  if (!argMode) {
    if (arg === '--help' || arg === '-h') {
      console.log('Usage:\n\toxy-gen -n project-name\n\toxy-gen -n plugin-name --lib\n');
      console.log('Params:');
      console.log('\t-v|--version\t\t- Version.');
      console.log('\t-h|--help\t\t- Help message.');
      console.log('\t-n|--name\t\t- Project name (NPM compatible: [a-zA-Z0-9-]+).');
      console.log('\t-l|--lib\t\t- Generate Oxygen compatible library (plugin).');
      console.log('\t-i|--do-not-install\t- Do not install dependencies.');
      console.log('\t-b|--do-not-build\t- Do not build project.');
      return;
    } else if (arg === '-v' || arg === '--version') {
      console.log(require(__dirname + '/package.json').version);
      return;
    } else if (arg === '--name' || arg === '-n') {
      argMode = 'name';
    } else if (arg === '--lib' || arg === '-l') {
      lib = true;
    } else if (arg === '--do-not-install' || arg === '-i') {
      doNotInstall = true;
      doNotBuild = true;
    } else if (arg === '--do-not-build' || arg === '-b') {
      doNotBuild = true;
    }
  } else if (argMode === 'name') {
    name = arg;
    argMode = null;
  }
}

var templates = lib ? 'templates-lib' : 'library-app';

console.log('Generate project: ' + name);
console.log(lib ? '- mode: library' : '- mode: application');

console.log('* copy templates...');
shelljs.ls('-A', path.join(__dirname, templates)).forEach(function(file){
  shelljs.cp('-R', path.join(__dirname, templates, file), './');
});

var contents = fs.readFileSync('./package.json', 'utf8');
contents = contents.replace(lib ? '~oxygen-lib~' : '~oxygen-game~', name);
fs.writeFileSync('./package.json', contents);

if (!doNotInstall) {
  console.log('* install dependencies...');
  if (lib) {
    shelljs.exec('npm install --save-dev', { silent: true });
  } else {
    shelljs.exec('npm install --save', { silent: true });
  }
}

if (!doNotBuild) {
  console.log('* build project...');
  shelljs.exec('npm run build', { silent: true });
}

console.log('* done!');
if (doNotInstall) {
  console.log('- `npm install` to install dependencies');
}
console.log('- `npm init` to provide project details');
console.log('- `npm run dev` to run dev server');
console.log('- `npm run build` to build production bundle');
console.log('- `npm run build-dev` to build development bundle');
