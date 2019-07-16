import { task, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import named from 'vinyl-named';
import rename from 'gulp-rename';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-gulp-cssnano';

import args from './util/args';

let lessTask = (cb) => src(['app/**/*.less'])
                        .pipe(less())
                        .pipe(autoprefixer())
                        .pipe(cssnano())
                        /* .pipe(named())
                        .pipe(rename({
                          extname: '.less.css'
                        })) */
                        .pipe(dest('server/public/less'))
                        .pipe(gulpif(args.watch, livereload()))
;

task('less', lessTask);

export default lessTask;