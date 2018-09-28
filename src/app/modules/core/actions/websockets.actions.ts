import { Action } from '@ngrx/store';

export enum WebsocketActionTypes {
    WsConnect = '[Websocket] Connect',
    WsLogsConnect = '[Websocket] Connect for current job',
    WsLogsDisconnect = '[Websocket] Disconnect for current job',
    WsConnectSuccess = '[Websocket] Connect with success',
    WsConnectFail = '[Websocket] Connect with fail',
    WsStartedEvent = '[Websocket] Started event'
};

export class WsConnect implements Action {
    readonly type = WebsocketActionTypes.WsConnect;
}

export class WsLogsConnect implements Action {
    readonly type = WebsocketActionTypes.WsLogsConnect;
}

export class WsLogsDisconnect implements Action {
    readonly type = WebsocketActionTypes.WsLogsDisconnect;
}

export class WsConnectSuccess implements Action {
    readonly type = WebsocketActionTypes.WsConnectSuccess;
}

export class WsConnectFail implements Action {
    readonly type = WebsocketActionTypes.WsConnectFail;
}

export class WsStartedEvent implements Action {
    readonly type = WebsocketActionTypes.WsStartedEvent;
}

export type WebsocketActions
    = WsConnect
    | WsLogsConnect
    | WsConnectSuccess
    | WsConnectFail;
