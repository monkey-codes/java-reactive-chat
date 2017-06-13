import {MESSAGES_RECEIVED} from '../actions';
const initialState = [];
export default function(state = initialState, action){
  switch(action.type){
      case MESSAGES_RECEIVED: return [...state, ...action.payload];
      default: return state;
  }
}
