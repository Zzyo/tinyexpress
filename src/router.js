var utils = require('./utils');

function Route() {
  this.stack = [];
}

/**
 * 将整个路由作为一个中间件（router）挂载到connect
 * 当一个路由请求，如http.get发起时，在connect遍历中间件，进入router并传入next方法，即函数入参out
 * 进入router后，依次去除Route的stack数组进行路由比较，符合则执行，否则继续下一次遍历
 * 在stack数组都比较完后，执行out函数进入connect的下一个中间件
 * 
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} out
 */
Route.prototype.middlewareInit = function(req, res, out) {
	var index = 0;
	var stack = this.stack;
	var next = function(err) {
		if(index < stack.length) {
			var mdw = stack[index++];
			if (mdw.method === req.method.toLowerCase() && mdw.path === utils.pathFormat(req.url, true)) {
				call(err, mdw.handle, req, res, next);
			} else {
				next();
			}
		} else {
			out();
		}
	}
	next();
}

/**
 * 执行handle函数，并将执行中出现的错误进行捕获及传递
 * 
 * @param {Error} err
 * @param {Function} handle
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
function call(err, handle, req, res, next) {
	var hasError = Boolean(err);
	var argLen = handle.length;
	try {
		if (hasError && argLen === 4) {
			handle(err, req, res, next);
			return;
		} else {
			handle(req, res, next);
			return;
		}
	}	catch(e) {
		console.log('执行路由出错', e);
		err = e;
	}
	next(err);
}

/**
 * 将路由方法、路由名称与执行方法放入stack数组
 * 
 * @param {String} method
 * @param {String} route
 * @param {Function} fn
 */
Route.prototype.addRoute = function(method, route, fn) {
	if (typeof route === 'function' || route === '') {
		throw new Error('路由路径不能为空');
	}
  this.stack.push({
    method: method,
    path: utils.pathFormat(route, true),
    handle: fn
  })
}

module.exports = Route;