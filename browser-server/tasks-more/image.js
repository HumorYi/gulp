import { task, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

import args from './util/args';

let image = (cb) => src(['app/**/*.css'])
                    .pipe(imagemin({
                      progressive: true,
                      use: [pngquant()] //使用pngquant来压缩png图片
                    }))
                    .pipe(dest('server/public/images'))
                    .pipe(gulpif(args.watch, livereload()))
;

task('image', image);

export default image;