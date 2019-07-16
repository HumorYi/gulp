import { task, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';

import args from './util/args';

let css = (cb) => src(['app/**/*.css'])
  .pipe(dest('server/public'))
  .pipe(gulpif(args.watch, livereload({ start: true })));

task('css', css);

export default css;