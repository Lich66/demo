import { Application, BackendSession, ChannelService, FrontendSession } from 'pinus';
let roommgr = require('../../../model/roommgr');    //todo 这种导入有问题，无法识别里面的内容

export default function (app: Application) {
    return new HallHandler(app);
}

export class HallHandler {
    constructor(private app: Application) {
        this.app = app;
        this.channelService = app.get('channelService');
    }

    private channelService: ChannelService;

    // async create(msg: any, session: FrontendSession) {
    //     await session.abind(msg.uid);
    //     let result = await this.app.rpc.hall.hallRemote.create.route(session)();
    //     session.set('roomId', result.roomId);
    //     session.push('roomId', function (err) {
    //         if (err) {
    //             console.error('set rid for session service failed! error is : %j', err.stack);
    //         }
    //     });
    //     return result;
    // }

    // async join(msg: any, session: FrontendSession) {
    //     await session.abind(msg.uid);
    //     session.set('roomId', msg.roomId);
    //     session.push('roomId', function (err) {
    //         if (err) {
    //             console.error('set rid for session service failed! error is : %j', err.stack);
    //         }
    //     });
    //     let result = await this.app.rpc.hall.hallRemote.join.route(session)(msg.uid,msg.roomId,this.app.get('serverId'));
    //     return result;
    // }

}