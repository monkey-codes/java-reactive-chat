import {USER_JOINED} from '../actions';

export default function(state = {}, action){
  switch(action.type){
    case USER_JOINED: return { ...state, ...action.payload};
      default: return state;
  }
}
