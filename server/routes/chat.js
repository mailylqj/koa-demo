const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
	console.log(next);
	ctx.websocket.send('Hello World');
	ctx.websocket.on('message', (message) => {
		// do something with the message from client
		console.log(message);
	});
});

module.exports = router;
