module.exports = {
    getDeviceList: async ctx => {
        ctx.body = {
            result: 0,
            data: [{
                deviceNO: '12345',
                deviceName: '23456',
                onLine: true
            }]
        }
    }
}