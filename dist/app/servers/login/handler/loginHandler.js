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
    return new LoginHandler(app);
}
exports.default = default_1;
class LoginHandler {
    constructor(app) {
        this.app = app;
        this.playerNum = 0;
    }
    login(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('登陆时session的id = ' + session.id, session.uid);
            //todo 一系列登陆检验，返回玩家信息
            this.playerNum++;
            return { name: `${msg.name}${this.playerNum}`, id: this.playerNum, headImg: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdYiaomspZJpLf6OUX74ib5fT0wibcVTQiab7nQtLOdyyObzUsCl0969Y4SHLp6YDOj0yFUsBKMVVyMw/132', sex: 1, diamond: 12 };
        });
    }
}
exports.LoginHandler = LoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5IYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvbG9naW4vaGFuZGxlci9sb2dpbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLG1CQUF5QixHQUFnQjtJQUNyQyxPQUFPLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFGRCw0QkFFQztBQUVEO0lBQ0ksWUFBb0IsR0FBZ0I7UUFBaEIsUUFBRyxHQUFILEdBQUcsQ0FBYTtRQUc1QixjQUFTLEdBQVcsQ0FBQyxDQUFDO0lBRjlCLENBQUM7SUFJSyxLQUFLLENBQUMsR0FBUSxFQUFFLE9BQXVCOztZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFELHFCQUFxQjtZQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxxSUFBcUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM3TyxDQUFDO0tBQUE7Q0FFSjtBQWJELG9DQWFDIn0=