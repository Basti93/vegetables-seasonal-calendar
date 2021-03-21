module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true
        }
    },
    pages: {
        index: 'src/main.js',
        print: 'src/print/main.js'
    }

}