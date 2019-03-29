## 使用方法

```
var http = require('http');
var express = require('../src/express');

var app = express();

http.createServer(app).listen(8000, function() {
	console.log('服务器已开启，端口：8000');
})
```

## 中间件

```
app.use(function(req, res, next) {
  console.log('enter middleware1');
  next();
  console.log('enter middleware2');
})
```

## 路由

```
app.get('/', function(req, res, next) {
  console.log('enter get');
  next();
})

app.post('/', function(req, res, next) {
  console.log('enter post');
  next();
})
```

## 模版

```
app.set('view engine', 'ejs');
app.set('views', path.resolve('test', 'view'));

app.get('/', function(req, res, next) {
  res.render('index.html', {title: 'express模版', name: 'snicker'});
})
```

## 错误捕获

```
app.use(function(req, res, next) {
	console.log(aaa);
	console.log('enter middleware');
	next();
})

app.get(function(req, res, next) {
	console.log(bbb);
	console.log('enter router');
	next();
})
```

