var utils = require('./utils');
var proto = {};

/**
 * connect中间件框架，返回一个http.createServer()的回调函数app
 * 通过mixin方法，把use与handle混入app，实现代码解耦
 * 
 * @return: {Function} app
 */
function createServer() {
	var app = function(req, res) {
		app.handle(req, res);
	}

	utils.mixin(app, proto);

	app.stack = [];
	
	return app;
}

/**
 * 中间件执行函数，通过闭包来达成中间件数组自动执行
 * 在一个http请求发起时，会遍历stack数组，并判断路由是否匹配，匹配则执行中间件函数
 * 
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
proto.handle = function(req, res) {
	var index = 0;
	var stack = this.stack;
	var next = function(err) {
		
		var mdw = stack[index++];
		if (mdw === undefined) {
			// 中间件遍历完成，判断在中间件执行过程是否有res.end，如果没有则返回未收到请求的提示
			if (res._header) {
				return;
			}
			res.setHeader('Content-Type', 'text/plain');
			res.end('Cannot ' + req.method + ' ' + req.url);
			return;
		}
		if (mdw.path === '' || mdw.path === utils.pathFormat(req.url)) {
			call(err, mdw.handle, req, res, next);
		} else {
			next(err);
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
		console.log('执行中间件出错', e);
		err = e;
	}
	next(err);
}

/**
 * 将路由与执行方法放入stack数组
 * 
 * @param {String} route
 * @param {Function} fn
 */
proto.use = function(route, fn) {
	if (typeof route === 'function') {
		fn = route;
		route = '';
	}
	this.stack.push({
		path: utils.pathFormat(route),
		handle: fn
	})
}

module.exports = createServer;