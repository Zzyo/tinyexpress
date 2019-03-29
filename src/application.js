var methods = require('methods');
var Router = require('./router');
var View = require('./view');
var middlewareInit = require('./middleware');

var app = {};

app.init = function() {
  this._router = new Router();
  this.useRouter = false;
  this.settings = {};
  this.use(middlewareInit(this));
  Object.defineProperty(this, 'router', {
    configurable: true,
    enumerable: true,
    get: function() {
      this.useRouter = true;
      return this._router.middlewareInit.bind(this._router);
    }
  })
}

app.set = function(key, value) {
  this.settings[key] = value;
}

// 为app挂载路由方法，如app.get、app.post
methods.forEach(function(method) {
  app[method] = function(route, fn) {
    if (!this.useRouter) {
      this.use(this.router);
    }
    this._router.addRoute(method, route, fn);
  }
})

app.engine = function(engine) {
  this.settings['view engine'] = engine;
}

// 路由方法，供res.render调用
app.render = function(name, options, fn) {
  var view = new View(name, {
    root: this.settings['views'] || process.cwd(),
    engine: this.settings['view engine'] || 'ejs'
  });
  view.render(options, fn);
}

module.exports = app;
