import { task, series, parallel } from 'gulp';

import clean from './clean';
import css from './css';
import less from './less';
import sass from './sass';
import image from './image';
import pages from './pages';
import scripts from './scripts';
import browser from './browser';
import serve from './server';

task('build', series(
                clean,
                parallel(
                  css,
                  less,
                  sass,
                  image,
                  pages,
                  scripts
                ),
                browser,
                serve
              )
);