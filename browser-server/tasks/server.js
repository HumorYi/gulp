import { task, watch } from 'gulp';
import gls from 'gulp-live-server';

import args from './util/args';

let serve = (cb) => {

  if (!args.watch) {
    return cb();
  }

  var server = gls.new(['--harmony', 'server/bin/www']);

  server.start();

  watch([
    'server/public/**/*.js',
    'server/public/**/*.css',
    'server/views/**/*.ejs',
  ], (file) => server.notify.apply(server, [file]));

  watch([
    'server/routes/**/*.js',
    'server/app.js'
  ], () => server.start.bind(server)());

  cb();

};

task('serve', serve);

export default serve;