import * as Router from 'koa-router';
const router = new Router();

const DeviceCtrl = require('../controller/deviceCtrl');
const Author = require('../controller/authorCtrl');

router.post('/getDeviceList', DeviceCtrl.getDeviceList);

router.post('/token', Author.restToken);

router.get('/account', Author.account);
router.post('/login', Author.login);
router.get('/logout', Author.logout);

module.exports = router;