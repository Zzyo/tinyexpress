var http = require('http');
var response = Object.create(http.ServerResponse.prototype);

/**
 * 定义一个继承http.ServerResponse的response对象，并添加render方法
 * 执行render方法，会执行app.render方法并将模版解析结果通过end方法返回给客户端
 * 
 * @param {String} name
 * @param {Object} option
 */
response.render = function(name, options) {
  var app = this.app;
  var next = this.next;
  var _this = this;

  var callback = function(err, html) {
    if (err) {
      console.log('模版引擎解析失败', err);
      return next();
    }
    _this.end(html);
  }
  app.render(name, options, callback);
}

module.exports = response;