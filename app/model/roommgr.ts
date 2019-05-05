import { stringify } from "querystring";
import { any } from "bluebird";

var db = require('../util/db');

var rooms = {};
var creatingRooms = {};

var userLocation = {};
var totalRooms = 0;

var DI_FEN = [1, 2, 5];
var MAX_FAN = [3, 4, 5];
var JU_SHU = [4, 8];
var JU_SHU_COST = [2, 3];

function generateRoomId() {
    var roomId = "";
    for (var i = 0; i < 6; ++i) {
        roomId += Math.floor(Math.random() * 10);
    }
    return roomId;
}

function constructRoomFromDb(dbdata) {
    var roomInfo = {
        uuid: dbdata.uuid,
        id: dbdata.id,
        numOfGames: dbdata.num_of_turns,
        createTime: dbdata.create_time,
        nextButton: dbdata.next_button,
        seats: new Array(4),
        conf: JSON.parse(dbdata.base_info)
    };
    var roomId = roomInfo.id;
    for (var i = 0; i < 4; ++i) {
        var s = roomInfo.seats[i] = {};//userId:string,score:string,name:string,ready:boolean,seatIndex:number
        // s.userId = dbdata["user_id" + i];
        // s.score = dbdata["user_score" + i];
        // s.name = dbdata["user_name" + i];
        // s.ready = false;
        // s.seatIndex = i;
        // if(s.userId > 0){
        // 	userLocation[s.userId] = {
        // 		roomId:roomId,
        // 		seatIndex:i
        // 	};
        // }
    }
    rooms[roomId] = roomInfo;
    totalRooms++;
    return roomInfo;
}

exports.createRoom = function () {
    let roomId = generateRoomId();
    while (rooms[roomId]) {
        roomId = generateRoomId();
    }
    console.log('创建房间生成的房间号：' + roomId);
    return roomId;
};

exports.destroy = function (roomId) {
    var roomInfo = rooms[roomId];
    if (roomInfo == null) {
        return;
    }

    for (var i = 0; i < 4; ++i) {
        var userId = roomInfo.seats[i].userId;
        if (userId > 0) {
            delete userLocation[userId];
            db.set_room_id_of_user(userId, null);
        }
    }

    delete rooms[roomId];
    totalRooms--;
    db.delete_room(roomId);
}

exports.getTotalRooms = function () {
    return totalRooms;
}

exports.getRoom = function (roomId) {
    return rooms[roomId];
};

exports.isCreator = function (roomId, userId) {
    var roomInfo = rooms[roomId];
    if (roomInfo == null) {
        return false;
    }
    return roomInfo.conf.creator == userId;
};

exports.enterRoom = function (roomId, userId, userName, callback) {
    var fnTakeSeat = function (room) {
        if (exports.getUserRoom(userId) == roomId) {
            //已存在
            return 0;
        }

        for (var i = 0; i < 4; ++i) {
            var seat = room.seats[i];
            if (seat.userId <= 0) {
                seat.userId = userId;
                seat.name = userName;
                userLocation[userId] = {
                    roomId: roomId,
                    seatIndex: i
                };
                //console.log(userLocation[userId]);
                db.update_seat_info(roomId, i, seat.userId, "", seat.name);
                //正常
                return 0;
            }
        }
        //房间已满
        return 1;
    }
    var room = rooms[roomId];
    if (room) {
        var ret = fnTakeSeat(room);
        callback(ret);
    }
    else {
        db.get_room_data(roomId, function (dbdata) {
            if (dbdata == null) {
                //找不到房间
                callback(2);
            }
            else {
                //construct room.
                room = constructRoomFromDb(dbdata);
                //
                var ret = fnTakeSeat(room);
                callback(ret);
            }
        });
    }
};

exports.setReady = function (userId, value) {
    var roomId = exports.getUserRoom(userId);
    if (roomId == null) {
        return;
    }

    var room = exports.getRoom(roomId);
    if (room == null) {
        return;
    }

    var seatIndex = exports.getUserSeat(userId);
    if (seatIndex == null) {
        return;
    }

    var s = room.seats[seatIndex];
    s.ready = value;
}

exports.isReady = function (userId) {
    var roomId = exports.getUserRoom(userId);
    if (roomId == null) {
        return;
    }

    var room = exports.getRoom(roomId);
    if (room == null) {
        return;
    }

    var seatIndex = exports.getUserSeat(userId);
    if (seatIndex == null) {
        return;
    }

    var s = room.seats[seatIndex];
    return s.ready;
}


exports.getUserRoom = function (userId) {
    var location = userLocation[userId];
    if (location != null) {
        return location.roomId;
    }
    return null;
};

exports.getUserSeat = function (userId) {
    var location = userLocation[userId];
    //console.log(userLocation[userId]);
    if (location != null) {
        return location.seatIndex;
    }
    return null;
};

exports.getUserLocations = function () {
    return userLocation;
};

exports.exitRoom = function (userId) {
    var location = userLocation[userId];
    if (location == null)
        return;

    var roomId = location.roomId;
    var seatIndex = location.seatIndex;
    var room = rooms[roomId];
    delete userLocation[userId];
    if (room == null || seatIndex == null) {
        return;
    }

    var seat = room.seats[seatIndex];
    seat.userId = 0;
    seat.name = "";

    var numOfPlayers = 0;
    for (var i = 0; i < room.seats.length; ++i) {
        if (room.seats[i].userId > 0) {
            numOfPlayers++;
        }
    }

    db.set_room_id_of_user(userId, null);

    if (numOfPlayers == 0) {
        exports.destroy(roomId);
    }
};