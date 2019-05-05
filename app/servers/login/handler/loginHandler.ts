import { Application, BackendSession } from 'pinus';

export default function (app: Application) {
    return new LoginHandler(app);
}

export class LoginHandler {
    constructor(private app: Application) {
    }

    private playerNum: number = 0;

    async login(msg: any, session: BackendSession) {
        console.log('登陆时session的id = ' + session.id, session.uid);
        //todo 一系列登陆检验，返回玩家信息
        this.playerNum++;
        return { name: `${msg.name}${this.playerNum}`, id: this.playerNum, headImg: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdYiaomspZJpLf6OUX74ib5fT0wibcVTQiab7nQtLOdyyObzUsCl0969Y4SHLp6YDOj0yFUsBKMVVyMw/132', sex: 1, diamond: 12 };
    }

}