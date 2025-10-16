import { takeLatest, put, call } from "redux-saga/effects";
import TaskTypes from "./taskActionTypes";
import {
  deleteTaskResponse,
  getTaskByIdResponse,
  getTasksResponse,
  postTaskResponse,
  putTaskResponse,
} from "./taskActions";
import axios from "axios";

const BASE_URL = "https://68d0ea7ce6c0cbeb39a2da2c.mockapi.io/users";

//---------------- GET TASKS LIST ----------------
export function* onGetTasksList() {
  try {
    const url = `${BASE_URL}/Tasks`;
    const response = yield call(() => axios.get(url).then((res) => res?.data));
    yield put(getTasksResponse(response));
  } catch (error) {
    yield put(getTasksResponse(error));
  }
}

//---------------- GET TASK BY ID ----------------
export function* onGetTaskById({ id }) {
  try {
    const url = `${BASE_URL}/Tasks/${id}`;
    const response = yield call(() => axios.get(url).then((res) => res?.data));
    yield put(getTaskByIdResponse(response));
  } catch (error) {
    yield put(getTaskByIdResponse(error));
  }
}

//---------------- POST TASK ----------------
export function* onPostTask({ payload }) {
  try {
    const url = `${BASE_URL}/Tasks`;
    const response = yield call(() =>
      axios
        .post(url, payload, { headers: { "Content-Type": "application/json" } })
        .then((res) => res?.data)
    );
    yield put(postTaskResponse(response));
  } catch (error) {
    yield put(postTaskResponse(error));
  }
}

//---------------- PUT TASK ----------------
export function* onPutTask({ payload, id }) {
  try {
    const url = `${BASE_URL}/Tasks/${id}`;
    const response = yield call(() =>
      axios
        .put(url, payload, { headers: { "Content-Type": "application/json" } })
        .then((res) => res?.data)
    );
    yield put(putTaskResponse(response));
  } catch (error) {
    yield put(putTaskResponse(error));
  }
}

//---------------- DELETE TASK ----------------
export function* onDeleteTask({ id }) {
  try {
    const url = `${BASE_URL}/Tasks/${id}`;
    const response = yield call(() =>
      axios
        .delete(url, { headers: { "Content-Type": "application/json" } })
        .then((res) => res?.data)
    );
    yield put(deleteTaskResponse(response));
  } catch (error) {
    yield put(deleteTaskResponse(error));
  }
}

//---------------- WATCHER SAGA ----------------
export function* TaskWatcherSaga() {
  yield takeLatest(TaskTypes.GET_TASKS_REQUEST, onGetTasksList);
  yield takeLatest(TaskTypes.GET_TASK_BY_ID_REQUEST, onGetTaskById);
  yield takeLatest(TaskTypes.POST_TASK_REQUEST, onPostTask);
  yield takeLatest(TaskTypes.PUT_TASK_REQUEST, onPutTask);
  yield takeLatest(TaskTypes.DELETE_TASK_REQUEST, onDeleteTask);
}
