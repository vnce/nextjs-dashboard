/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Modify the existing CSS rule to use MiniCssExtractPlugin
    config.module.rules.forEach((rule) => {
      if (rule.test && rule.test.toString().includes('css')) {
        rule.use = [
          !isServer ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ];
      }
    });

    // Add MiniCssExtractPlugin to the plugins array
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: isServer
          ? '[name].css'
          : 'static/css/[name].[contenthash].css',
        chunkFilename: isServer
          ? '[id].css'
          : 'static/css/[id].[contenthash].css',
      }),
    );

    return config;
  },
};

module.exports = nextConfig;
