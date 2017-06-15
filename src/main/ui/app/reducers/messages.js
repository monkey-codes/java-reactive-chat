import {MESSAGE_RECEIVED} from '../actions/chat';
const initialState = [];
export default function(state = initialState, action){
  switch(action.type){
      case MESSAGE_RECEIVED: return [...state, action.payload];
      default: return state;
  }
}
