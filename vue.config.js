const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  /* webpack 链式操作 */
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'));
  },
};
