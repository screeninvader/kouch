#!/usr/bin/env node

import {exists} from 'fs';
import express from 'express';
import {join} from 'path';
import minimist from 'minimist';

var server = express()
  , argv   = minimist(process.argv.slice(2))
  , port   = argv.port || 1337
  , dir    = process.cwd()
;

if ( argv ) {
  console.log(`argv: ${JSON.stringify(argv)}`);
  if ( argv.dir && typeof argv.dir === 'string' ) {
    if ( argv.dir.indexOf('/') === 0 ) {
      dir = argv.dir;
    } else {
      dir = join( process.cwd(), argv.dir );
    }
  }
}

console.log(`running server with port: ${port} and dir: ${dir}`);

server.use(express.static(dir, {
  dotfiles: 'ignore',
  extensions: ['html'],
  index: 'vulcanized.html',
  maxAge: '1d',
  redirect: false,
  setHeaders: (res, path, stat) => {
    res.set('x-timestamp', Date.now())
  }
}));

server.get('/kill', (req, res, next) => {
  console.log('/kill');
  process.exit();
});

server.listen(port);

console.log(
`
Screeninvader dev server listening to port: ${port}
and serving static files from ${dir}
`
);
