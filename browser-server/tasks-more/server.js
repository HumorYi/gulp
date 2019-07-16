import { task, watch } from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';

import args from './util/args';

let serve = (cb) => {

  if (!args.watch) {
    return cb();
  }

  let server = liveserver.new(['--harmony', 'server/bin/www']);

  server.start();

  watch([
    'server/public/**/*.css',
    'server/public/**/*.js',
    'server/views/**/*.ejs',
  ], (file) => {
    server.notify.apply(server, [file]);
  });

  watch([
    'server/routes/**/*.js',
    'server/app.js'
  ], () => {
    server.start();
  });

  cb();

};

task('serve', serve);

export default serve;