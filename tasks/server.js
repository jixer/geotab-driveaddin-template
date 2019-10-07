import gulp from 'gulp';
import Browser from 'browser-sync';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';

import { devConfig as WebpackConfig } from './webpack';
import { GeotabMockMiddleware } from './geotab';

const browser = Browser.create();
const bundler = webpack(WebpackConfig);

export function server() {
    let config = {
        server: 'app',
        open: false,
        middleware: [
            WebpackDevMiddleware(bundler, { /* options */}),
            WebpackHotMiddleware(bundler),
            GeotabMockMiddleware()
        ],
        server: {
            routes: {
                '/bower_components': path.resolve(__dirname, '../bower_components'),
                '/.dev': path.resolve(__dirname, '../.dev'),
            }
        }
    };

    browser.init(config);
    gulp.watch('app/**/*').on('change', () => browser.reload());
}