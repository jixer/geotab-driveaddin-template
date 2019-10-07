import gulp from 'gulp';
import { server } from './tasks/server';
import { build } from './tasks/webpack';
import del from 'del';
import { bower_install, copy_config } from './tasks/scripts';


export const clean = () => del('dist');

export const serve      = gulp.series(gulp.parallel(clean, bower_install), server);
export const publish    = gulp.series(clean, 
                                      gulp.parallel(build, copy_config));

export default serve;