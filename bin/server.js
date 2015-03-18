import {createServer} from 'http';
import ecstatic from 'ecstatic';
import {join} from 'path';

var port   = 1337
  , conf   = { 
      root   : join(process.cwd(), 'dist')
    , showDir: false
    , autoIndex: true
    , defaultExt: 'html'
  }
;

createServer( ecstatic(conf) ).listen(port);
 
console.log(
`
Screeninvader dev server listening to port: ${port}
and serving static files from ${conf.root}
`
);
