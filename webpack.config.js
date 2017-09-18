import CleanWebpackPlugin from "clean-webpack-plugin";
import ExtractTextWebpackPlugin from "extract-text-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackTemplate from "html-webpack-template";
import {
    join,
} from "path";
import {
    EnvironmentPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
    NoEmitOnErrorsPlugin,
    ProvidePlugin,
} from "webpack";

import {
    description as title,
} from "./package";

const fileLoader = path =>
    ({
        loader: "file-loader",
        options: {
            name: "[name].[ext]?[hash]",
            outputPath: path,
        },
    }),
    sourceMapLoader = loader =>
    ({
        loader,
        options: {
            sourceMap: true,
        },
    });

export default {
    devServer: {
        hot: true,
    },
    devtool: "source-map",
    entry: "./src/main",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: sourceMapLoader("style-loader"),
                    use: [
                        sourceMapLoader("css-loader"),
                    ],
                }),
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: "babel-loader",
            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            scss: ExtractTextWebpackPlugin.extract({
                                fallback: sourceMapLoader("vue-style-loader"),
                                use: [
                                    sourceMapLoader("css-loader"),
                                    sourceMapLoader("sass-loader"),
                                ],
                            }),
                        },
                    },
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: fileLoader("fonts/"),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                use: fileLoader("images/"),
            },
        ],
    },
    output: {
        filename: "main.js?[hash]",
        library: "app",
        libraryExport: "default",
        libraryTarget: "window",
        path: join(__dirname, "public/"),
    },
    plugins: [
        new EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            appMountId: "mount",
            inject: false,
            template: HtmlWebpackTemplate,
            title,
        }),
        new NoEmitOnErrorsPlugin(),
        ...(process.argv.some(arg =>
            arg.includes("webpack-dev-server"),
        ) ? [
            new ExtractTextWebpackPlugin({
                disable: true,
            }),
            new HotModuleReplacementPlugin(),
            new NamedModulesPlugin(),
        ] : [
            new CleanWebpackPlugin([
                "public/",
            ], {
                exclude: [
                    ".git",
                ],
            }),
            new ExtractTextWebpackPlugin("style.css?[hash]"),
        ]),
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js",
        },
        extensions: [
            ".js",
            ".vue",
        ],
    },
};
