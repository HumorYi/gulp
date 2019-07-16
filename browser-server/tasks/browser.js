import { task, watch } from 'gulp';

import args from './util/args';
import scripts from './scripts';
import pages from './pages';
import css from './css';

let browser = (cb) => {

  if (!args.watch) {
    return cb();
  }

  watch('app/**/*.js', scripts);
  watch('app/**/*.ejs', pages);
  watch('app/**/*.css', css);

  cb();
};

task('browser', browser);

export default browser;