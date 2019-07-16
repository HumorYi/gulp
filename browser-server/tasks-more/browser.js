import { task, watch } from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';

import args from './util/args';

let browser = (cb) => {

  if (!args.watch) {
    return cb();
  }

  watch('app/**/*.js', ['scripts']);
  watch('app/**/*.ejs', ['pages']);
  watch('app/**/*.css', ['css']);

  cb();
};

task('browser', browser);

export default browser;