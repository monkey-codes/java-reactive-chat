import { combineReducers } from 'redux';
import DummyReducer from './dummy';
import MessagesReducer from './messages';

const rootReducer = combineReducers({
  dummy: DummyReducer,
  messages: MessagesReducer
});

export default rootReducer;
