import { task, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import cssnano from 'gulp-gulp-cssnano';
import named from 'vinyl-named';
import rename from 'gulp-rename';

import args from './util/args';

let css = (cb) => src(['app/**/*.css'])
                    .pipe(cssnano())
                    .pipe(named())
                    .pipe(rename({
                      extname: '.min.css'
                    }))
                    .pipe(dest('server/public/css'))
                    .pipe(gulpif(args.watch, livereload()))
;

task('css', css);

export default css;