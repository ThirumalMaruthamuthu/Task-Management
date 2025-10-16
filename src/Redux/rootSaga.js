import { all } from "redux-saga/effects";
import { TaskWatcherSaga } from "./TaskSaga/taskSaga";

export default function* rootSaga() {
  yield all([TaskWatcherSaga()]);
}
