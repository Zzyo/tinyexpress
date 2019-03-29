// 测试router.js路由
var http = require('http');
var express = require('../src/express');

var app = express();

app.get('/', function(req, res, next) {
	console.log('enter router1');
	next();
	console.log('enter router2');
})

app.use('/', function(req, res, next) {
	console.log('enter middleware1');
	next();
	console.log('enter middleware2');
})

app.get('/', function(req, res, next) {
	console.log('enter router3');
	next();
	console.log('enter router4');
})

app.get('/user', function(req, res, next) {
	console.log('get user');
	next();
})

app.post('/user', function(req, res, next) {
	console.log('post user');
	next();
})

app.use('/', function(req, res, next) {
	next();
	res.end('hello world');
})

app.use('/user', function(req, res, next) {
	console.log('enter user middleware');
})

http.createServer(app).listen(8000, function() {
	console.log('服务器已开启，端口：8000');
})

