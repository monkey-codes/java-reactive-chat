import {MESSAGES_RECEIVED} from '../actions';
const initialState = [{"id":1130426225140,"user":"Ron Reynolds","message":" By it enough to valley desire do"},{"id":1377051323994,"user":"Ron Reynolds","message":" Saw yet kindness too replying whatever marianne"},{"id":857010202313,"user":"Darnell George","message":" Shy occasional terminated insensible and inhabiting gay"},{"id":220252753506,"user":"Jermaine Terry","message":" It satisfied to mr commanded consisted disposing engrossed"},{"id":342070693612,"user":"Ross Newman","message":" Astonished as travelling assistance or unreserved oh pianoforte ye"},{"id":501145374764,"user":"Kurt Farmer","message":" Surrounded to me occasional pianoforte alteration unaffected impossible ye"},{"id":1061047080725,"user":"Deborah Bridges","message":" As if made held in an shot"},{"id":764594137387,"user":"Garrett Nelson","message":" Boy happiness sportsmen say prevailed offending concealed nor was provision"}];
export default function(state = initialState, action){
  switch(action.type){
      case MESSAGES_RECEIVED: return [...state, ...action.payload];
      default: return state;
  }
}
