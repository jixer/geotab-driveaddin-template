import bower from 'gulp-bower';
import gulp from 'gulp';
import path from 'path';
import jsonEditor from 'gulp-json-editor';
import eslint from 'gulp-eslint';

let appConfigPath = path.resolve(__dirname, '../app/config.json');
let distPath = path.resolve(__dirname, '../dist');
let scriptsPath = path.resolve(__dirname, '../app/scripts');

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