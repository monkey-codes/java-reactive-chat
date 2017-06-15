import {USER_JOINED} from '../actions/chat';

//export default function(state ={alias: "Jack Sparrow", avatar:"https://robohash.org/jack.png"}, action){
export default function(state ={}, action){
  switch(action.type){
    case USER_JOINED: return { ...state, ...action.payload.user};
    default: return state;
  }
}
