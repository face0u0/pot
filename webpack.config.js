const path = require('path')

module.exports = {

    mode: 'development',

    entry: path.resolve(__dirname, "index.js"),
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: "",
        libraryExport: '',
        libraryTarget: 'umd',
        globalObject: "this"
    },
}