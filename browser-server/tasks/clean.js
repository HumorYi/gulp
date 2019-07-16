import { task } from 'gulp';
import del from 'del';

let clean = (cb) => del(['server/public', 'server/views']);

task('clean', clean);

export default clean;