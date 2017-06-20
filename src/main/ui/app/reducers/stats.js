import {USER_STATS, USER_LEFT, MESSAGE_RECEIVED} from '../actions/chat';


export default function(state = {}, action){
  switch(action.type){
    case USER_STATS: return {...action.payload.stats};
    case USER_LEFT: return Object.values(state).
          filter(stat => stat.user.alias != action.payload.user.alias).
          reduce((acc, val) => ({...acc, [val.user.alias]: val}), {});
    case MESSAGE_RECEIVED:
      const {payload:{user:{alias}, timestamp}, payload:{user}} = action;
      const messageCount = state[alias] ? state[alias].messageCount +1 : 1;
      return {...state, [alias]: {user, lastMessage: timestamp, messageCount }}
    default: return state;
  }
}
