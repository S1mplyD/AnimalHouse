const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: '.src/main.js',
    output: {
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'vue-template-loader',
                exclude: /index.html/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}