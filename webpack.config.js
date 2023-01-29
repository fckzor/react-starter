/* eslint-disable no-undef */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	}

	if (isProduction) {
		config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()]
	}

	return config
}

const filename = (ext) => (isDevelopment ? `[name].${ext}` : `[name].[hash].${ext}`)

const babelOptions = (preset) => {
	const options = {
		presets: ['@babel/preset-env'],
		plugins: ['@babel/plugin-proposal-class-properties'],
	}

	if (preset) {
		options.presets.push(preset)
	}

	return options
}

const jsLoaders = () => {
	return [
		{
			loader: 'babel-loader',
			options: babelOptions(),
		},
	]
}

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: path.join(__dirname, '/public/index.html'),
			minify: {
				collapseWhitespace: isProduction,
			},
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'public/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
		new MiniCssExtractPlugin(),
	]

	return base
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.tsx'],
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.png'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	optimization: optimization(),
	devServer: {
		port: 3000,
		hot: isDevelopment,
		historyApiFallback: true,
	},
	devtool: 'eval-cheap-module-source-map',
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: jsLoaders(),
			},
			{ test: /\.tsx?$/, loader: 'ts-loader' },
		],
	},
}
