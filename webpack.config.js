const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/scripts'),
    output: {
        path: path.resolve(__dirname, 'www/scripts/index.js'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
   }
};