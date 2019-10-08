import path from 'path';
import webpack from 'webpack';


const sharedConfig = {
    context: path.resolve(__dirname, '../app'),
    entry: './scripts/index.js',
    output: {
        filename: './samplebundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMaps: 'both',
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/proposal-class-properties']
                        
                    }
                }
            },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     use: 'ts-loader'
            // },
            {
                test: /\.(html|png|jpg|gif|svg)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        useRelativePath: true
                    }
                }]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    }, 
                    {
                        // if sourceMap, eg: 'blob:http://localhost:8080/c340184f-5285-4072-9b54-8be639160073'
                        loader: "css-loader", options: { sourceMap: true}
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: [ '.js' ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

export const devConfig = Object.assign({}, sharedConfig);
devConfig.mode = 'development';
devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
devConfig.devtool = 'eval-source-map';
devConfig.devServer = {
    contentBase: path.resolve(__dirname, '../dist')
};

export const config = Object.assign({}, sharedConfig);
config.mode = 'production';

export function build() {
    return new Promise((resolve, reject) => webpack(config, (err, stats) => {
        if (err) {
            console.log('Webpack', err);
            reject(err);
        } else {
            console.log(stats.toString());
            resolve();
        }
    }));
}
