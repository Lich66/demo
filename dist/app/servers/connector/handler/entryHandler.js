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
    return new Handler(app);
}
exports.default = default_1;
class Handler {
    constructor(app) {
        this.app = app;
    }
    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    entry(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            return { code: 200, msg: 'game server is ok.' };
        });
    }
    create(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            // await session.abind(msg.uid);
            let result = yield this.app.rpc.game.gameRemote.create.route(session)();
            // session.set('roomId', result.roomId);
            // session.push('roomId', function (err) {
            //     if (err) {
            //         console.error('set rid for session service failed! error is : %j', err.stack);
            //     }
            // });
            return result;
        });
    }
    join(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.app.rpc.game.gameRemote.join.route(session)(msg.uid, msg.roomId, this.app.get('serverId'));
            if (result.code === 0) {
                yield session.abind(msg.uid);
                session.set('roomId', msg.roomId);
                session.push('roomId', function (err) {
                    if (err) {
                        console.error('set rid for session service failed! error is : %j', err.stack);
                    }
                });
            }
            return result;
        });
    }
    leave(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.app.rpc.game.gameRemote.leave.route(session)(session.uid, session.get('roomId'), this.app.get('serverId'));
            return result;
        });
    }
    ready(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.app.rpc.game.gameRemote.ready.route(session)(session.uid, session.get('roomId'), this.app.get('serverId'));
            return result;
        });
    }
    /**
     * Publish route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    publish(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                topic: 'publish',
                payload: JSON.stringify({ code: 200, msg: 'publish message is ok.' })
            };
            return result;
        });
    }
    /**
     * Subscribe route for mqtt connector.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    subscribe(msg, session) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                topic: 'subscribe',
                payload: JSON.stringify({ code: 200, msg: 'subscribe message is ok.' })
            };
            return result;
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxtQkFBeUIsR0FBZ0I7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRkQsNEJBRUM7QUFFRDtJQUNJLFlBQW9CLEdBQWdCO1FBQWhCLFFBQUcsR0FBSCxHQUFHLENBQWE7SUFFcEMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDRyxLQUFLLENBQUMsR0FBUSxFQUFFLE9BQXdCOztZQUMxQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQztRQUNwRCxDQUFDO0tBQUE7SUFFSyxNQUFNLENBQUMsR0FBUSxFQUFFLE9BQXdCOztZQUMzQyxnQ0FBZ0M7WUFDaEMsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUN4RSx3Q0FBd0M7WUFDeEMsMENBQTBDO1lBQzFDLGlCQUFpQjtZQUNqQix5RkFBeUY7WUFDekYsUUFBUTtZQUNSLE1BQU07WUFDTixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFSyxJQUFJLENBQUMsR0FBUSxFQUFFLE9BQXdCOztZQUN6QyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsR0FBRztvQkFDaEMsSUFBSSxHQUFHLEVBQUU7d0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxtREFBbUQsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2pGO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsR0FBUSxFQUFFLE9BQXdCOztZQUMxQyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuSSxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsR0FBUSxFQUFFLE9BQXdCOztZQUMxQyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuSSxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFRDs7Ozs7OztPQU9HO0lBQ0csT0FBTyxDQUFDLEdBQVEsRUFBRSxPQUF3Qjs7WUFDNUMsSUFBSSxNQUFNLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsd0JBQXdCLEVBQUUsQ0FBQzthQUN4RSxDQUFDO1lBQ0YsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7T0FPRztJQUNHLFNBQVMsQ0FBQyxHQUFRLEVBQUUsT0FBd0I7O1lBQzlDLElBQUksTUFBTSxHQUFHO2dCQUNULEtBQUssRUFBRSxXQUFXO2dCQUNsQixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLDBCQUEwQixFQUFFLENBQUM7YUFDMUUsQ0FBQztZQUNGLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtDQUVKO0FBckZELDBCQXFGQyJ9