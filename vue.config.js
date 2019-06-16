module.exports = {
    devServer: {
        proxy: {
            '/app': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true
            }
        }
    }

}