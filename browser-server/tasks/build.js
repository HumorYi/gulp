import { task, series, parallel } from 'gulp';

import clean from './clean';
import css from './css';
import pages from './pages';
import scripts from './scripts';
import browser from './browser';
import serve from './server';

task('build', series(clean, css, pages, scripts, browser, serve));