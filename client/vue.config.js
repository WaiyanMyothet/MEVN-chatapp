module.exports={
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "~@/assets/scss/abstract/mixins.scss";`
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
            }
        }
    }
}