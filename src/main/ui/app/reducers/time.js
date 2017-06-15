import { MINUTE_PASSED, TICKER_INTERVAL_CREATED, TICKER_INTERVAL_REMOVED } from '../actions/time';

export default function(state = {}, action){
  switch(action.type){
    case MINUTE_PASSED: return {...state, now: action.payload };
    case TICKER_INTERVAL_CREATED: return {...state, interval: action.payload };
    case TICKER_INTERVAL_REMOVED: return {...state, interval: null };
    default: return state;
  }
}
