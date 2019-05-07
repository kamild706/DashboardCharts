const path = require("path");

const config = {
  // devtool: 'source-map',
  entry: {
    main: "./src/index.js",
    navigation: "./src/navigation.js"
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.geojson$/,
        loader: "json-loader"
      }
    ]
  }
};

module.exports = config;
