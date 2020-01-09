import * as WebSocket from 'ws';

import * as schedule from 'node-schedule';

function SocketServ(appServer:any){
    const wss = new WebSocket.Server({
        server: appServer
    });

    let rule = new schedule.RecurrenceRule();
    rule.second = [...Array(60).keys()]; // 每隔 1秒执行一次

    let max = 500, min = 10;

    wss.on('connection', (ws, req) => {
        console.log(req.url);
        ws.on('message', (message) => {
            const msg = message.toString('utf8');
            const data = JSON.parse(msg);
            
            // Object.assign(meeting, data);
            // console.log(meeting);
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            job.cancel();
        })

        const job = schedule.scheduleJob(rule, ()=>{
            ws.send(JSON.stringify({
                ao_id: Math.floor(Math.random()*(max-min+1)+min),
                bo_id: Math.floor(Math.random()*(max-min+1)+min),
                co_id: Math.floor(Math.random()*(max-min+1)+min),
                do_id: Math.floor(Math.random()*(max-min+1)+min),
                eo_id: Math.floor(Math.random()*(max-min+1)+min),
                fo_id: Boolean(Math.round(Math.random()))
            }));
        });
    });
}

export default SocketServ;
