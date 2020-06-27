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
    // chainWebpack: config => {
    //     config.module.rule('js').include.add('/packages').end().use('babel').loader('babel-loader')
    // },
    css: {
        loaderOptions: {
            less: {
                lessOptions: { 
                    // important extra layer for less-loader^6.0.0
                    javascriptEnabled: true
                }
            }
        }
    }
}