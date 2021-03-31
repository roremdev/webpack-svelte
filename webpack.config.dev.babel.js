import { resolve, join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default () => {
    return {
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        resolve: {
            alias: {
                svelte: resolve('node_modules', 'svelte'),
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main'],
        },
        module: {
            rules: [
                {
                    test: /\.svelte$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            hotReload: true
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: resolve(__dirname, './public/index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: resolve(__dirname, 'src', 'images'),
                        to: 'images',
                    },
                ],
            }),
            new CleanWebpackPlugin(),
        ],
        devServer: {
            contentBase: join(__dirname, 'dist'),
            compress: true,
            port: 3000,
        },
    };
};
