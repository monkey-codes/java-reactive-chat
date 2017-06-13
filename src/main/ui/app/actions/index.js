export const DUMMY = 'DUMMY';
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const MESSAGE_SENT = 'MESSAGE_SENT';


export function fetchDummy(dummyArg) {
  return {
    type: DUMMY,
    payload: ["dummy"]
  }
}

export function fetchDummyMessages() {
  return dispatch => {
    setInterval(() =>  dispatch({type: MESSAGES_RECEIVED, payload: randomPayload() }) , 3000);
  }
}

const socket = new WebSocket(`ws://${location.host}/websocket/echo`);
const eventToActionAdapters = {
  "CHAT_MESSAGE": ({id, timestamp, payload:{user, message}}) =>
  ({ type:MESSAGES_RECEIVED, payload:[{ id, timestamp, user, message }]})
};

export function fetchMessages() {
  return dispatch => {
    socket.onmessage = (msg) =>{
      const event = JSON.parse(msg.data);
      dispatch(eventToActionAdapters[event.type](event));
    }
  }
}

export function sendMessage(user, message) {
  return dispatch => {
    //socket.send(JSON.stringify({user, message}));
    socket.send(JSON.stringify({ type: "CHAT_MESSAGE", payload: {user, message} }));
    dispatch({type: MESSAGE_SENT, payload: message});
  }
}
