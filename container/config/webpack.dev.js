const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
	mode: "development",
	output: {
		publicPath: "http://localhost:8050/",
	},
	devServer: {
		port: 8050,
		historyApiFallback: {
			index: "/index.html",
		},
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			remotes: {
				marketing: "marketing@http://localhost:8040/remoteEntry.js",
				auth: "auth@http://localhost:8045/remoteEntry.js",
			},
			shared: packageJson.dependencies,
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
