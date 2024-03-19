const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        PATHS: './src/js/paths.js',
        SEATS: './src/js/seats.js',
        FANSPEED: './src/js/fan_speed.js',
        KUKSA: './src/js/kuksa.js',
        VAL_WEB: './src/generated/val_grpc_web_pb.js',
        VAL: './src/generated/val_pb.js',
        TYPES: './src/generated/types_pb.js',
        BUTTONS: './src/js/buttons.js',
        TEMPERATURE: './src/js/temperature.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'var',
        library: '[name]'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                terserOptions: {}
            })
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/icon.*',
                    to: '[name][ext]'
                },
                {
                    from: 'src/appinfo.json',
                    to: 'appinfo.json'
                },
                {
                    from: 'src/images/*',
                    to: 'images/[name][ext]'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCSSExtractPlugin({
            filename: 'app.css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    resolve: {
        fallback: {
            "zlib": false, // Do not include polyfill for zlib
            "fs": false, // Do not include polyfill for fs
            "node-zlib-backport": false // Do not include polyfill for node-zlib-backport
        }
    },
    devServer: {
        compress: true,
        port: 9000
    }
};
