#!/bin/bash

set -eu

WEBFONT_URL='https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700'
PATH=$(pwd)/node_modules/.bin/:$PATH

function clean() {
    echo 'clean dist/'
    rm -rf dist/
    mkdir -p dist/vendor/ dist/js
}

function install() {
    echo 'installing npm dependencies'
    npm install --production
    echo 'installing bower dependencies'
    bower install

    echo 'downloading Ubuntu Mono webfont'
    webfont-dl $WEBFONT_URL \
               --font-out=src/font \
               --out src/css/font.styl \
               --css-rel=/font
}

function build() {
    cp -r src/* dist/
    cp -r bower_components/* dist/vendor/

    echo 'babelify invader'
    babel dist/invader \
          --out-dir dist/invader \
          --experimental \
          --source-maps

    echo 'browserify and babelify main app'
    browserify dist/js \
               --outfile dist/js/index.js \
               -t babelify

    echo 'stylus compile invader css styles'
    find dist/ -name "*.styl" -type f -exec stylus {} \
         --import node_modules/nib/ \
         --sourcemap-inline \;

    echo 'jade compiling html files in dist/'
    jade dist \
         --pretty

    echo 'polymer-vulcanize all components into dist/vulcanized.html'
    vulcanize -o dist/vulcanized.html  dist/index.html \
              --abspath ./dist/ \
              --inline \
              --strip
}

function serve() {
    echo 'starting server...'
    servomatic --dir=dist
}

# run the function given as the first argument
$1;
