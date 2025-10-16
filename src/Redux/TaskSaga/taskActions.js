import TaskTypes from "./taskActionTypes";

//----------------TASK LIST GET--------------------
export const getTasksRequest = (payload) => ({
  type: TaskTypes.GET_TASKS_REQUEST,
  payload: payload,
});

export const getTasksResponse = (payload) => ({
  type: TaskTypes.GET_TASKS_RESPONSE,
  payload: payload,
});

export const getTasksResponseClear = () => ({
  type: TaskTypes.GET_TASKS_RESPONSE_CLEAR,
});

//----------------TASK BY ID GET--------------------
export const getTaskByIdRequest = (id) => ({
  type: TaskTypes.GET_TASK_BY_ID_REQUEST,
  id: id,
});

export const getTaskByIdResponse = (payload) => ({
  type: TaskTypes.GET_TASK_BY_ID_RESPONSE,
  payload: payload,
});

export const getTaskByIdResponseClear = () => ({
  type: TaskTypes.GET_TASK_BY_ID_RESPONSE_CLEAR,
});

//----------------TASK POST--------------------------
export const postTaskRequest = (payload) => ({
  type: TaskTypes.POST_TASK_REQUEST,
  payload: payload,
});

export const postTaskResponse = (payload) => ({
  type: TaskTypes.POST_TASK_RESPONSE,
  payload: payload,
});

export const postTaskResponseClear = () => ({
  type: TaskTypes.POST_TASK_RESPONSE_CLEAR,
});

//----------------TASK PUT----------------------------
export const putTaskRequest = (payload, id) => ({
  type: TaskTypes.PUT_TASK_REQUEST,
  payload: payload,
  id: id,
});

export const putTaskResponse = (payload) => ({
  type: TaskTypes.PUT_TASK_RESPONSE,
  payload: payload,
});

export const putTaskResponseClear = () => ({
  type: TaskTypes.PUT_TASK_RESPONSE_CLEAR,
});

//----------------TASK DELETE-------------------------
export const deleteTaskRequest = (id) => ({
  type: TaskTypes.DELETE_TASK_REQUEST,
  id: id,
});

export const deleteTaskResponse = (payload) => ({
  type: TaskTypes.DELETE_TASK_RESPONSE,
  payload: payload,
});

export const deleteTaskResponseClear = () => ({
  type: TaskTypes.DELETE_TASK_RESPONSE_CLEAR,
});
