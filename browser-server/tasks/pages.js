import { task, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';

import args from './util/args';

let pages = (cb) => src(['app/**/*.ejs'])
                    .pipe(dest('server'))
                    .pipe(gulpif(args.watch, livereload({ start: true })))
;

task('pages', pages);

export default pages;