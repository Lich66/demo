import { Application, ChannelService, RemoterClass, FrontendSession } from 'pinus';

export default function (app: Application) {
    return new RoomRemote(app);
}

declare global {
    interface UserRpc {
        hall: {
            hallRemote: RemoterClass<FrontendSession, RoomRemote>;
        };
    }
}

export class RoomRemote {
    private app: Application;
    private channelService: ChannelService;
    constructor(app: Application) {
        this.app = app;
        this.channelService = app.get('channelService');
    }

   


}