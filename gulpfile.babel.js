import gulp from 'gulp';
import { server } from './tasks/server';
import { build } from './tasks/webpack';
import del from 'del';
import { bower_install, copy_config, run_lint } from './tasks/scripts';


export const clean = () => del('dist');

export const lint       = run_lint;
export const serve      = gulp.series(gulp.parallel(clean, bower_install, lint), server);
export const publish    = gulp.series(gulp.parallel(clean, lint),
                                      gulp.parallel(build, copy_config));

export default serve;