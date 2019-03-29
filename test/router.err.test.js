// 测试router.js路由抛出错误的情况
var http = require('http');
var express = require('../src/express');

var app = express();

app.get('/', function(req, res, next) {
	console.log('enter router1');
	next();
	console.log('enter router2');
})

app.get('/', function(req, res, next) {
	console.log(aaa);
	console.log('enter router3');
	next();
})

app.get('/', function(req, res, next) {
	// console.log(bbb);
	console.log('enter router4');
	next();
})

http.createServer(app).listen(8000, function() {
	console.log('服务器已开启，端口：8000');
})

