import { Application, ChannelService, RemoterClass, FrontendSession } from 'pinus';

export default function (app: Application) {
    return new RoomRemote(app);
}

declare global {
    interface UserRpc {
        game: {
            gameRemote: RemoterClass<FrontendSession, RoomRemote>;
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


    generateRoomId() {
        var roomId = "";
        for (var i = 0; i < 6; ++i) {
            roomId += Math.floor(Math.random() * 10);
        }
        return roomId;
    }

    public async create() {
        let roomId: string = undefined;
        let channel = undefined;
        {
            roomId = this.generateRoomId();
            channel = this.channelService.getChannel(roomId, false);
            console.log('创建的房间号：' + roomId);
        } while (channel);
        let channel2 = this.channelService.createChannel(roomId);
        console.log('房间通道为：' + channel2.name);

        return { code: 0, roomId: roomId };

    }

    public async join(uid, roomId, sid) {
        let channel = this.channelService.getChannel(roomId, false);
        if (!channel) {
            return { code: 500, msg: '房间不存在' };
        }
        let users = channel.getMembers();
        if (users.length > 5) {
            return { code: 400, msg: '房间已满' };
        }
        let param = {
            username: uid
        }
        channel.add(uid, sid);
        channel.pushMessage('onJoin', param);
        return { code: 0, users: users };

    }

    public async leave(uid: string, roomId: string, sid: string) {
        console.log('离开房间信息', uid, roomId, sid);
        let channel = this.channelService.getChannel(roomId, false);
        if (!!channel) {
            channel.leave(uid, sid);
        }
        let param = {
            user: uid
        };
        channel.pushMessage('onLeave', param);
        return { code: 0 };

    }

    public async ready(uid: string, roomId: string, sid: string) {
        console.log('玩家准备信息', uid, roomId, sid);
        let channel = this.channelService.getChannel(roomId, false);
        let param = {
            user: uid
        };
        channel.pushMessage('onReady', param);
        return { code: 0, user: uid };

    }

}