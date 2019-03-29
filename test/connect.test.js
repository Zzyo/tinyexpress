// 测试connect.js中间件框架
var http = require('http');
var connect = require('../src/connect');

var app = connect();

app.use(function(req, res, next) {
	console.log('enter middleware1');
	next();
	console.log('enter middleware2');
})

app.use('', function(req, res, next) {
	console.log('enter middleware3');
	next();
	res.end('hahaha');
})

app.use('/user', function(req, res, next) {
	console.log('enter user');
	next();
})

app.use('/', function(req, res, next) {
	next();
})

http.createServer(app).listen(8000, function() {
	console.log('服务器已开启，端口：8000');
})

