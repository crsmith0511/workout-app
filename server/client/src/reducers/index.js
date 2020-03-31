import { combineReducers } from "redux";
import WorkoutReducer from './reducer-wod';
import UserReducer from './reducer-user';

const rootReducer = combineReducers({

  workout: WorkoutReducer,
  user: UserReducer,
});

export default rootReducer;