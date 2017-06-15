import { combineReducers } from 'redux';
import MessagesReducer from './messages';
import UserReducer from './user';
import TimeReducer from './time';
import UserStatsReducer from './stats';

const rootReducer = combineReducers({
  messages: MessagesReducer,
  user: UserReducer,
  time: TimeReducer,
  stats: UserStatsReducer
});

export default rootReducer;
