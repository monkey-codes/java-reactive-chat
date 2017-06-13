import { combineReducers } from 'redux';
import DummyReducer from './dummy';
import MessagesReducer from './messages';
import UserReducer from './user';
import TimeReducer from './time';

const rootReducer = combineReducers({
  dummy: DummyReducer,
  messages: MessagesReducer,
  user: UserReducer,
  time: TimeReducer
});

export default rootReducer;
