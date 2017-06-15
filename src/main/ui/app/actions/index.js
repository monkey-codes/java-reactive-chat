export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const USER_JOINED = 'USER_JOINED';
export const USER_STATS = 'USER_STATS';
export const USER_LEFT = 'USER_LEFT';

const socket = new WebSocket(`ws://${location.host}/websocket/echo`);

const eventToActionAdapters = {
  "CHAT_MESSAGE": ({id, timestamp, payload:{user, message}}) =>
  ({ type:MESSAGES_RECEIVED, payload:{ id, timestamp, user, message }}),
  USER_STATS: ({payload}) => ({type: USER_STATS, payload}),
  USER_LEFT: ({payload}) => ({type: USER_LEFT, payload})
};

export function fetchMessages() {
  return dispatch => {
    socket.onmessage = (msg) =>{
      //console.log(msg);
      const event = JSON.parse(msg.data);
      if(eventToActionAdapters[event.type]){
        dispatch(eventToActionAdapters[event.type](event));
      }
    }
  }
}

export function sendMessage(user, message) {
  return dispatch => {
    socket.send(JSON.stringify({ type: "CHAT_MESSAGE", payload: {user, message} }));
    dispatch({type: MESSAGE_SENT, payload: message});
  }
}

export function createUser(user) {
  return dispatch => {
    socket.send(JSON.stringify({type: USER_JOINED, payload: { user }}));
    dispatch({type: USER_JOINED, payload: user});
  }
}
