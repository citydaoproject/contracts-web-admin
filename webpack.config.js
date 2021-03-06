const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');

const WEBPACK_SERVER_PORT = process.env.WEBPACK_SERVER_PORT || 5001;

const webpackConfig = (env, argv) => {
  const { mode } = argv;
  const production = mode === 'production';
  const development = !production;
  const analyze = false;
  const plugins = [
    new HtmlWebpackPlugin({ template: 'src/index.html.ejs' }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  if (analyze) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle_report.html',
      }),
    );
  }

  return {
    entry: './src/index.tsx',
    output: {
      filename: '[name].[contenthash].bundle.js',
      publicPath: '/',
    },

    devtool: 'source-map',
    devServer: {
      allowedHosts: 'all',
      hot: true,
      host: 'localhost',
      historyApiFallback: true,
      port: WEBPACK_SERVER_PORT,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    plugins,

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /\/node_modules\//,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },

    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
        },
        { test: /\.svg$/, use: ['@svgr/webpack'] },
        { test: /\.(png|woff|woff2|eot|ttf)$/, loader: 'url-loader' },
      ],
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
};

module.exports = webpackConfig;
