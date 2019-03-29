/**
 * 将原对象source的属性混入到目标对象target
 * 
 * @param {Object} target
 * @param {Object} source
 */
function mixin(target, source) {
	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			target[key] = target[key] || source[key];
		}
	}
}

/**
 * 格式化中间件路径，转换为小写并去除结尾的'/'
 * 区分普通中间件和路由中间件，当http请求为'get /'时，普通中间件返回''，路由中间件返回'/'
 * 
 * @param {String} path
 * @param {Boolean} keepOneChar
 * @return {String}
 */
function pathFormat(path, keepOneChar = false) {
	var str = path.toLowerCase();
	var condition = keepOneChar ? str.length > 1 : str.length > 0
	if (condition && str.lastIndexOf('/') === str.length - 1) {
		str = str.substr(0, str.length - 1);
	}
	return str;
}

module.exports = {
	mixin,
	pathFormat
}