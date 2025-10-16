import { combineReducers } from "redux";
import TaskReducer from "./TaskSaga/taskReducer";

const rootReducer = combineReducers({
  taskReducer: TaskReducer,
});

export default rootReducer;
