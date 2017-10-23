const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/maui-widget-es6.js',
    entry: {
        'maui-widget': './src/maui-widget-es6.js',
        'maui-widget.min': './src/maui-widget-es6.js'
    },
    output: {
        path: path.join(__dirname),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack
            .optimize
            .UglifyJsPlugin({include: /\.min\.js$/, minimize: true})
    ]
};