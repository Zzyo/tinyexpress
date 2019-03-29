/**
 * 初始化app的时候执行中间件，扩展req和res
 * 
 * @param {Function} app 
 * @return: {Function}
 */
function middlewareInit(app) {
  return function(req, res, next) {
    // 将app.response挂载到res原型链上，继承response.render方法
    res.__proto__ = app.response;

    req.res = res;
    res.req = req;
    req.app = app;
    res.app = app;
    res.next = next;
    next();
  }
}

module.exports = middlewareInit;