/**!
 *@license
 * enix@foxmail.com
 * repository: https://github.com/Neverland/ajax
 */


define('ajax', [], function () {

	return function (method, url, data, callback, config) {
		var xhr = new XMLHttpRequest,
			config = config || {},
			t = [];

		if (typeof(data) == 'function') {
			callback = data;
			data = null;
			config = callback;
		} else if (typeof(callback) != 'function') {
			callback = function () {}
		}

		if (data != null && ({}).toString.call(data).indexOf('Object') > -1) {
			for (var i in data) {
				data.hasOwnProperty(i) && (t.push(i + '=' + data[i]));
			}
			data = t.join('&');
		}

		method = method.toUpperCase() || 'GET';

		'GET' == method && data && data.length > 0 && (url += data);

		xhr.addEventListener('readystatechange', function () {
			xhr.readyState == 4 && /200|304/g.test(xhr.status) && callback(xhr.responseText, xhr.responseXML);
		}, false);

		xhr.addEventListener('timeout', function () {
			typeof config.ontimeout == 'function' ? config.ontimeout() : alert('网络超时');
		}, false);

		xhr.timeout = isNaN(config.timeout) ? 4000 : config.timeout;

		xhr.open(method || 'GET', url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data || null);
		return xhr;

	}

});



