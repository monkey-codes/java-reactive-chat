import {USER_STATS, USER_LEFT, MESSAGES_RECEIVED} from '../actions';


export default function(state = {}, action){
  switch(action.type){
    case USER_STATS: return {...action.payload};
    case USER_LEFT: return Object.values(state).
          filter(stat => stat.user.alias != action.payload.user.alias).
          reduce((acc, val) => ({...acc, [val.user.alias]: val}), {});
    case MESSAGES_RECEIVED:
      const {payload:{user:{alias}, timestamp}, payload:{user}} = action;
      const messageCount = state[alias] ? state[alias].messageCount +1 : 1;
      return {...state, [alias]: {user, lastMessage: timestamp, messageCount }}
    default: return state;
  }
}
