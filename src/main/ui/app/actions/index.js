export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const CREATE_USER = 'CREATE_USER';
export const USER_STATS = 'USER_STATS';
export const USER_LEFT = 'USER_LEFT';



export function fetchDummyMessages() {
  return dispatch => {
    setInterval(() =>  dispatch({type: MESSAGES_RECEIVED, payload: randomPayload() }) , 3000);
  }
}

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
    socket.send(JSON.stringify({type: "CREATE_USER", payload: { user }}));
    dispatch({type: CREATE_USER, payload: user});
  }
}
