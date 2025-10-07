// vue.config.js
module.exports = {
  publicPath: "/",
  devServer: {
    // 设置默认端口
    port: 8081,
    host: "localhost",
    // 设置代理
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://localhost:8080/",
        // 将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false
};
