import {MINUTE_PASSED} from '../actions/time';

export default function(state = {now: new Date()}, action){
  switch(action.type){
    case MINUTE_PASSED: return { now: action.payload};
      default: return state;
  }
}
