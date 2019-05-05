import { Application, FrontendSession } from 'pinus';

export default function (app: Application) {
    return new Handler(app);
}

export class Handler {
    constructor(private app: Application) {

    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async entry(msg: any, session: FrontendSession) {
        return { code: 200, msg: 'game server is ok.' };
    }

    async create(msg: any, session: FrontendSession) {
        // await session.abind(msg.uid);
        let result = await this.app.rpc.game.gameRemote.create.route(session)();
        // session.set('roomId', result.roomId);
        // session.push('roomId', function (err) {
        //     if (err) {
        //         console.error('set rid for session service failed! error is : %j', err.stack);
        //     }
        // });
        return result;
    }

    async join(msg: any, session: FrontendSession) {
        let result = await this.app.rpc.game.gameRemote.join.route(session)(msg.uid, msg.roomId, this.app.get('serverId'));
        if (result.code === 0) {
            await session.abind(msg.uid);
            session.set('roomId', msg.roomId);
            session.push('roomId', function (err) {
                if (err) {
                    console.error('set rid for session service failed! error is : %j', err.stack);
                }
            });
        }
        return result;
    }

    async leave(msg: any, session: FrontendSession) {
        let result = await this.app.rpc.game.gameRemote.leave.route(session)(session.uid, session.get('roomId'), this.app.get('serverId'));
        return result;
    }

    async ready(msg: any, session: FrontendSession) {
        let result = await this.app.rpc.game.gameRemote.ready.route(session)(session.uid, session.get('roomId'), this.app.get('serverId'));
        return result;
    }

    /**
     * Publish route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async publish(msg: any, session: FrontendSession) {
        let result = {
            topic: 'publish',
            payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
        };
        return result;
    }

    /**
     * Subscribe route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async subscribe(msg: any, session: FrontendSession) {
        let result = {
            topic: 'subscribe',
            payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
        };
        return result;
    }

}