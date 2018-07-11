import { Action } from '@ngrx/store';

export enum WebsocketActionTypes {
    WsConnect = '[Websocket] Connect',
    WsConnectSuccess = '[Websocket] Connect with success',
    WsConnectFail = '[Websocket] Connect with fail',
};

export class WsConnect implements Action {
    readonly type = WebsocketActionTypes.WsConnect;
}

export class WsConnectSuccess implements Action {
    readonly type = WebsocketActionTypes.WsConnectSuccess;
}

export class WsConnectFail implements Action {
    readonly type = WebsocketActionTypes.WsConnectFail;
}

export type WebsocketActions
    = WsConnect
    | WsConnectSuccess
    | WsConnectFail;
