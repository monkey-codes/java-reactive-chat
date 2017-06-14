import { combineReducers } from 'redux';
import DummyReducer from './dummy';
import MessagesReducer from './messages';
import UserReducer from './user';
import TimeReducer from './time';
import UserStatsReducer from './stats';

const rootReducer = combineReducers({
  dummy: DummyReducer,
  messages: MessagesReducer,
  user: UserReducer,
  time: TimeReducer,
  stats: UserStatsReducer
});

export default rootReducer;
