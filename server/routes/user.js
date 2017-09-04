const Router = require('koa-router');
const router = new Router();

router.get('/:id', async (ctx, next) => {
	const title = 'hello koa';
	console.log(ctx);
	console.log(this)
	await ctx.render('user', {
		titleTxt: title,
		content: 'kkkkk'
	});
});

module.exports = router;