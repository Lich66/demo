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
const dispatcher_1 = require("../../../util/dispatcher");
function default_1(app) {
    return new GateHandler(app);
}
exports.default = default_1;
class GateHandler {
    constructor(app) {
        this.app = app;
    }
    /**
     * Gate handler that dispatch user to connectors.
     *
     * @param {Object} msg message from client
     * @param {Object} session
     * @param {Function} next next stemp callback
     *
     */
    queryEntry(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let uid = msg.uid;
            if (!uid) {
                return {
                    code: 500,
                    msg: "不存在的用户非法登陆！"
                };
            }
            // get all connectors
            let connectors = this.app.getServersByType('connector');
            if (!connectors || connectors.length === 0) {
                return {
                    code: 500,
                    msg: "无法连接服务器！"
                };
            }
            // select connector
            let res = dispatcher_1.dispatch(uid, connectors);
            return {
                code: 0,
                host: res.host,
                port: res.clientPort
            };
        });
    }
}
exports.GateHandler = GateHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9nYXRlL2hhbmRsZXIvZ2F0ZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLHlEQUFvRDtBQUVwRCxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNJLFlBQW9CLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFFcEMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDRyxVQUFVLENBQUMsR0FBb0IsRUFBRSxPQUF3Qjs7WUFDM0QsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNsQixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLGFBQWE7aUJBQ3JCLENBQUM7YUFDTDtZQUNELHFCQUFxQjtZQUNyQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU87b0JBQ0gsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsR0FBRyxFQUFFLFVBQVU7aUJBQ2xCLENBQUM7YUFDTDtZQUNELG1CQUFtQjtZQUNuQixJQUFJLEdBQUcsR0FBRyxxQkFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNwQyxPQUFPO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLFVBQVU7YUFDdkIsQ0FBQztRQUNOLENBQUM7S0FBQTtDQUNKO0FBckNELGtDQXFDQyJ9