const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: './src/ts/pageControllers/index.ts',
        pianoGames: './src/ts/pageControllers/pianoGames.ts',
    },
    output: {
        path: path.resolve(__dirname, "wwwroot"),
        filename: "[name].[chunkhash].js",
        publicPath: "/",
        clean: true,
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif|mp3|wav|json|eot|ttf|woff|ico)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/html/index.html",
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            filename: "pianoGames.html",
            template: "./src/html/pianoGames.html",
            chunks: ['pianoGames']
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/assets", to: "./assets", info: { minimized: true }, },
            ]
        })
    ],
};