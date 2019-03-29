var cons = require('consolidate');
var path = require('path');
var fs = require('fs');

function View(name, config) {
    this.engine = config.engine;
    this.templatePath = path.join(config.root, name);
    this.lookup();
}

// 检测模板是否存在
View.prototype.lookup = function() {
    if (!fs.existsSync(this.templatePath)) {
        throw new Error(`模版路径不存在: ${this.templatePath}`);
    }
};

// 调用consolidate模块渲染模版
View.prototype.render = function (options, fn) {
    let templatePath = this.templatePath;
    return cons[this.engine](templatePath, options, fn);
};

module.exports = View;