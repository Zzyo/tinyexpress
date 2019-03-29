var connect = require('./connect');
var expressProto = require('./application');
var utils = require('./utils');
var response = require('./response');

function createApplication() {
	var express = connect();

	// 给connect框架混入express特性
	utils.mixin(express, expressProto);

	// 给服务器设置response属性并原型链继承response
	express.response = { __proto__: response };

	express.init();

	return express;
}

module.exports = createApplication;