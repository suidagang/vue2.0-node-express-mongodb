module.exports = {
    // 基本路径
    baseUrl: '/',
    // webpack-dev-server 相关配置
    devServer: {
     open: process.platform === 'darwin',
     host: '0.0.0.0',
     port: 1818,
     https: false,
     hotOnly: false,
     proxy: {
         '/goods':{
             target:'http://localhost:3000'
         }
     }, // 设置代理
     before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
    
    }
}