#!/usr/bin/env bash

mkdir tests
cd tests
mkdir app
mkdir lib
cd app
node ../../index.js -n app
node ../../index.js -n app -i
node ../../index.js -n app -i -b
cd ../lib
node ../../index.js -n lib --lib
node ../../index.js -n lib --lib -i
node ../../index.js -n lib --lib -i -b
