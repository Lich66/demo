"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    return new RoomRemote(app);
}
exports.default = default_1;
class RoomRemote {
    constructor(app) {
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
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            let roomId = undefined;
            let channel = undefined;
            {
                roomId = this.generateRoomId();
                channel = this.channelService.getChannel(roomId, false);
                console.log('创建的房间号：' + roomId);
            }
            while (channel)
                ;
            let channel2 = this.channelService.createChannel(roomId);
            console.log('房间通道为：' + channel2.name);
            return { code: 0, roomId: roomId };
        });
    }
    join(uid, roomId, sid) {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
            channel.add(uid, sid);
            channel.pushMessage('onJoin', param);
            return { code: 0, users: users };
        });
    }
    leave(uid, roomId, sid) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    ready(uid, roomId, sid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('玩家准备信息', uid, roomId, sid);
            let channel = this.channelService.getChannel(roomId, false);
            let param = {
                user: uid
            };
            channel.pushMessage('onReady', param);
            return { code: 0, user: uid };
        });
    }
}
exports.RoomRemote = RoomRemote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZVJlbW90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC9zZXJ2ZXJzL2dhbWUvcmVtb3RlL2dhbWVSZW1vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFGRCw0QkFFQztBQVVEO0lBR0ksWUFBWSxHQUFnQjtRQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFHRCxjQUFjO1FBQ1YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDeEIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVZLE1BQU07O1lBQ2YsSUFBSSxNQUFNLEdBQVcsU0FBUyxDQUFDO1lBQy9CLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUN4QjtnQkFDSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMvQixPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQzthQUNuQztZQUFDLE9BQU8sT0FBTztnQkFBQyxDQUFDO1lBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENB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