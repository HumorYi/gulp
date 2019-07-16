import { task, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import named from 'vinyl-named';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-gulp-cssnano';

import args from './util/args';

let sassTask = (cb) => src(['app/**/*.sass'])
                        .pipe(sass())
                        .pipe(autoprefixer())
                        .pipe(cssnano())
                        /* .pipe(named())
                        .pipe(rename({
                          extname: '.sass.css'
                        })) */
                        .pipe(dest('server/public/sass'))
                        .pipe(gulpif(args.watch, livereload()))
;

task('less', sassTask);

export default sassTask;