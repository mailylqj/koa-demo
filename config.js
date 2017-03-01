const config = {
	"proxyMap": {
    "~^/securerest": "http://10.10.103.117:8180",
    "~^/restsearch": "http://10.10.103.117:8180"
	},
	"serverPort": 8090,
	"serverDir": "static",
  database: {
    DATABASE: 'koa_demo',
    USERNAME: 'root',
    PASSWORD: 'abc123',
    PORT: '3306',
    HOST: 'localhost'
  }
}
module.exports = config
