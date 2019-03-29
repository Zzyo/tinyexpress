// 测试view.js模版
var http = require('http');
var path = require('path');
var express = require('../src/express');

var app = express();

app.set('view engine', 'ejs');
// app.engine('ejs');
app.set('views', path.resolve('test', 'view'));


app.get('/', function(req, res, next) {
  res.render('index.html', {title: 'express模版', name: 'snicker'});
})

http.createServer(app).listen(8000, function() {
	console.log('服务器已开启，端口：8000');
})

