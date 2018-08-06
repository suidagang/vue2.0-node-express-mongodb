module.exports = {
    // webpack-dev-server 相关配置
    devServer: {
     open: process.platform === 'darwin',
     host: '0.0.0.0',
     port: 1818,
     https: false,
     hotOnly: false,
     proxy: null, // 设置代理
     before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
    
    }
}