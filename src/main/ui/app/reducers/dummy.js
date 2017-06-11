import {DUMMY} from '../actions';

export default function(state = [], action){
  switch(action.type){
      case DUMMY: return ["1","2","3"];
      default: return [];
  }
}
