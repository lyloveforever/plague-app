module.exports = {  
    /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */  
    publicPath: "",  
    assetsDir: "static/lipin",  
    outputDir: "dist",  
    runtimeCompiler: true,  
    productionSourceMap: false,  
    /* webpack-dev-server 相关配置 */  
    "devServer" : {
        // "disableHostCheck" : true, //禁止访问本地host文件
        // "https" : true,
        // "port" : 8080,
        "proxy" : {
            "/api" : {
                "target" : "http://localhost:3000/",
                "changeOrigin" : true, //是否跨域
                "secure" : true, // 是否支持 https 协议的代理
                "pathRewrite" : {
                    "^/api" : ""
                }
            }
        }
    } 
}