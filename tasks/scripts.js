import bower from 'gulp-bower';
import gulp from 'gulp';
import path from 'path';
import jsonEditor from 'gulp-json-editor';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import { browser } from './server';
import wait from 'gulp-wait';

let appConfigPath = path.resolve(__dirname, '../app/config.json');
let distPath = path.resolve(__dirname, '../dist');
let scriptsPath = path.resolve(__dirname, '../app/scripts');
let testsPath = path.resolve(__dirname, '../test/functional');

const formatJson = (json) => {
    var options = json.dev;
    var distHost = options.dist.host;
    for (let i = 0; i < json.items.length; i++) {
      let item = json.items[i];
      if (Boolean(item.url)) {
        item.url = distHost + item.url;
      }
      if (Boolean(item.click)) {
        item.click = distHost + item.click;
      }
      if (Boolean(item.icon) && item.icon.indexOf('data:image') === -1) {
        item.icon = distHost + item.icon;
      }
    }
    // remove dev options
    delete json.dev;
    return json; // must return JSON object.
}

export const run_tests = () => 
  gulp.src(`${testsPath}/**/*.js`, { read: false })
      .pipe(wait(15000))
      .pipe(mocha({
        reporter: 'nyan',
        timeout: 20000,
        exit: true
      }))
      .once('error', err => {
        console.error(err);
        browser.exit(1);
        process.exit(1);
      })
      .once('end', () => {
        console.log('Done running tests');
        browser.exit();
        process.exit();
      })

export const run_lint = () => 
  gulp.src(`${scriptsPath}/**/*.js`)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());

export const bower_install = () => bower();
export const copy_config = () => 
    gulp.src(appConfigPath)
        .pipe(jsonEditor(formatJson))
        .pipe(gulp.dest(distPath));