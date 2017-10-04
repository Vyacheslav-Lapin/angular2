const path = require('path');

// plugins: [
//     "syntax-async-functions"
// ],

module.exports = {
    entry: "./src/main",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080
    },

    module: {
        loaders: [
            {
                test: /.js$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["env"]
                }
            }
        ]
    },

    watch: true,
    devtool: 'source-map'
};
