import bower from 'gulp-bower';
import gulp from 'gulp';
import path from 'path';
import jsonEditor from 'gulp-json-editor';

let appConfigPath = path.resolve(__dirname, '../app/config.json');
let distPath = path.resolve(__dirname, '../dist');

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


export const bower_install = () => bower();
export const copy_config = () => 
    gulp.src(appConfigPath)
        .pipe(jsonEditor(formatJson))
        .pipe(gulp.dest(distPath));