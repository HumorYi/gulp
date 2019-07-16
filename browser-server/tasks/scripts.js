import { task, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import { log, colors } from 'gulp-util';

import args from './util/args';

let scripts = (cb) => src(['app/js/index.js'])
                        .pipe(plumber({
                          errorHandler() {}
                        }))
                        .pipe(named())
                        .pipe(
                          gulpWebpack({
                            mode: 'development',
                            module: {
                              rules: [{test: /\.js$/, use: 'babel-loader'}]
                            }
                          }),
                          null,
                          (err, stats) => {
                            log(
                              `Finished '${colors.cyan('scripts')}'`,
                              stats.toString({ chunks: false })
                            )
                          }
                        )
                        .pipe(dest('server/public/js'))
                        .pipe(rename({
                          extname: '.min.js'
                        }))
                        .pipe(uglify({
                          compress: { properties: false },
                          output: { quote_keys: true }
                        }))
                        .pipe(dest('server/public/js'))
                        .pipe(gulpif(args.watch, livereload({ start: true })))
;

task('scripts', scripts);

export default scripts;