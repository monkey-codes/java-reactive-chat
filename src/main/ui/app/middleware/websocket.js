export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';


class NullSocket {
  send(message){
    console.log(`Warning: send called on NullSocket, dispatch a ${WEBSOCKET_CONNECT} first`);
  }
}

function factory({messageToActionAdapter}) {

  let socket = new NullSocket();

  return ({dispatch}) => {
    return next => action => {

      switch (action.type) {
        case WEBSOCKET_CONNECT:
          socket = new WebSocket(action.payload.url);
          socket.onmessage = (msg) => {
            dispatch(messageToActionAdapter(msg) || { type:WEBSOCKET_MESSAGE, payload: msg.data});
          }
          break;
        case WEBSOCKET_SEND:
          socket.send(JSON.stringify(action.payload));
          break;
      }
      return next(action);
    }
  }
}
export default factory;

