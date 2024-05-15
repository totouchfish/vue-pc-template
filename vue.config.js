const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const isGzip = false; // 是否开启Gzip压缩
module.exports = {
  publicPath: "/", // 默认值'/'根目录, './'所有的资源都会被链接为相对路径, 用于设置域名根目录到项目文件根目录间的url
  outputDir: "dist", // 打包输出的文件名
  devServer: {
    port: "8080",
    proxy: {
      "/punishment": {
        target: "http://192.168.200.8:5075/",
        changeOrigin: true, // 发送请求头中的host会设置成target
      },
    },
  },
  chainWebpack: (config) => {
    // 添加svg配置
    const entry = config.entry("app");
    const svgRule = config.module.rule("svg");
    // 清空默认svg规则
    svgRule.uses.clear();
    //针对svg文件添加svg-sprite-loader规则
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });

    // 正式环境的处理
    if (process.env.NODE_ENV === "production") {
      // 开发生产环境, 不压缩js代码
      if (process.env.VUE_APP_MODE === "beta") {
        config.optimization.minimize(false);
      }

      // 拆包
      if (process.env.VUE_APP_MODE === "prod") {
        config.optimization &&
          config.optimization.splitChunks({
            // 拆包配置
            chunks: "all", //三选一："initial" 初始化，"all"(默认就是all)，"async"（动态加载）
            minSize: 30000, // 形成一个新代码块最小的体积,只有 >= minSize 的bundle会被拆分出来 30000
            maxSize: 0, //拆分之前最大的数值，默认为0，即不做限制
            minChunks: 1, //引入次数，如果为2 那么一个资源最少被引用两次才可以被拆分出来
            maxAsyncRequests: 5, // 按需加载的最大并行请求数
            maxInitialRequests: 3, // 一个入口最大并行请求数
            automaticNameDelimiter: "~", // 文件名的连接符
            name: true,
            cacheGroups: {
              // node_modules模块包
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: "chunk-vendors",
                // name(module) {
                //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                //   return `chunk.${packageName.replace('@', '')}`;
                // },
                chunks: "all",
                priority: -10,
              },
              // UI库单独拆包
              elementUI: {
                name: "chunk-elementUI",
                priority: 20, //  the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
              },
              // 共享模块
              common: {
                name: "chunk-common",
                minChunks: 2,
                maxSize: 1024, //拆分之前最大的数值，默认为0，即不做限制
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          });

        config.plugin("TerserJSPlugin").use(
          new TerserJSPlugin({
            terserOptions: {
              output: {
                comments: false, // 去掉注释
              },
              warnings: false,
              compress: {
                drop_console: true, // 打包时去除console
                drop_debugger: true, // 打包时去除debugger
              },
            },
          })
        );

        isGzip &&
          config.plugin("CompressionWebpackPlugin").use(
            new CompressionWebpackPlugin({
              filename: "[path].gz[query]",
              algorithm: "gzip",
              test: /\.js$|\.json$|\.html$|.\css/, // 匹配文件名
              threshold: 10240, // 对超过10k的数据压缩
              minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
              deleteOriginalAssets: false, // 不删除源文件
            })
          );
      }
    }
  },
};
