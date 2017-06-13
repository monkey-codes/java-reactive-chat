import {CREATE_USER} from '../actions/user';

export default function(state = {alias: 'Jack Sparrow', avatar:'https://robohash.org/Jack.png'}, action){
  switch(action.type){
    case CREATE_USER: return { ...state, ...action.payload};
      default: return state;
  }
}
