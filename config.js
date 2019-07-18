const config = {
	proxyMap: {
		"~^/securerest": "http://10.10.103.117:8180",
		"~^/restsearch": "http://10.10.103.117:8180"
	},
	serverPort: 8090,
	serverDir: "static",
	database: {
		DATABASE: "koa_demo",
		USERNAME: "root",
		PASSWORD: "admin",
		PORT: "3306",
		HOST: "localhost"
	},
	redis: {
		port: 6379,
		host: '127.0.0.1'
	},
	mongodb: {
		url: 'mongodb://127.0.0.1:27017/testDB'
	}
};
module.exports = config;
