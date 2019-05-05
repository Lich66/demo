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
            //todo 一系列登陆检验，返回玩家信息
            this.playerNum++;
            return { name: `${msg.name}${this.playerNum}`, id: this.playerNum, headImg: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdYiaomspZJpLf6OUX74ib5fT0wibcVTQiab7nQtLOdyyObzUsCl0969Y4SHLp6YDOj0yFUsBKMVVyMw/132', sex: 1, diamond: 12 };
        });
    }
}
exports.LoginHandler = LoginHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW5IYW5sZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9sb2dpbi9oYW5kbGVyL2xvZ2luSGFubGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNJLFlBQW9CLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFHNUIsY0FBUyxHQUFXLENBQUMsQ0FBQztJQUY5QixDQUFDO0lBSUssS0FBSyxDQUFDLEdBQVEsRUFBRSxPQUF1Qjs7WUFDekMscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLHFJQUFxSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzdPLENBQUM7S0FBQTtDQUVKO0FBWkQsb0NBWUMifQ==