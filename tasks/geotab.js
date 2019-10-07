import url from 'url';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(__dirname, '../app/config.json');
const sourceDir = path.resolve(__dirname, '../app');
const devDir = path.resolve(__dirname, '../.dev');

export function GeotabMockMiddleware(options) {
    return (req, res, next) => {

        var body = '<body>';
        var script = '<head';
        var parsed = url.parse(req.url);
        var pos;
        var htmlSource;
        var config = JSON.parse(fs.readFileSync(configPath));
        var isDriveAddin = config.items.some(function (item) {
            return item.path && item.path.indexOf('DriveAppLink') > -1;
        });

        var isButton = config.items.some(function (item) {
            return Boolean(item.page);
        });

        if (parsed.pathname === '/' || parsed.pathname.indexOf(config.dev.root + '.html') > -1) {
            if (isButton) {
                htmlSource = fs.readFileSync(`${devDir}/button.html`, 'utf8')
                               .replace('{click}', config.items[0].click || '')
                               .replace('{icon}', `style="background-image: url(${config.items[0].icon})"` || '');
            } else {
                htmlSource = fs.readFileSync(parsed.pathname === '/' ? `${sourceDir}/${config.dev.root}.html` : parsed.pathname, 'utf8');
            }

            pos = htmlSource.indexOf(script);
            if (pos > -1) {
                htmlSource = htmlSource.substring(0, pos) + `<script>window.geotab = {addin: {}, customButtons: {}, isDriveAddin: ${isDriveAddin}};</script>` + htmlSource.substring(pos);
            }

            pos = htmlSource.indexOf(body);
            if (pos > -1) {
                let source = htmlSource.substring(0, pos + body.length) + fs.readFileSync(`${devDir}/login.html`, 'utf8')
                if (isDriveAddin) {
                    source += `<div id="app">${htmlSource.substring(pos + body.length)}</div>`;
                } else {
                    source += htmlSource.substring(pos + body.length);
                }
                htmlSource = source;
            }

            res.end(htmlSource);
        } else {
            next();
        }
    }
}