module.exports = {
    publicPath: './',
    productionSourceMap: false,
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    devServer: {
        // development server port 8000
        port: 8080
    }
    // css: {
    //     loaderOptions: {
    //         less: {
    //             lessOptions: { 
    //                 // important extra layer for less-loader^6.0.0
    //                 javascriptEnabled: true
    //             }
    //         }
    //     }
    // }
}