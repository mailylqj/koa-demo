module.exports = function () {
	return function (ctx, next) {
		return new Promise((resolve, reject) => {
			ctx.type = 'text/javascript';
			resolve();
			return next;
		}).catch((err) => {
			return next;
		});
	};
};

// KOA原生实现jsonp
app.use(async (ctx) => {
	if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
		let callbackName = ctx.query.callback || 'callback';
		const returnData = {
			success: true,
			data: {
				text: 'this is a jsonp api',
				time: new Date().getTime()
			}
		};

		// jsonp的script字符串
		const jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;
		// 用text/javascript，让请求支持跨域获取
		ctx.type = 'text/javascript';
		// 输出jsonp字符串
		ctx.body = jsonpStr;
	} else {
		ctx.body = 'hello jsonp';
	}
});