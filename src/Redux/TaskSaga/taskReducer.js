import TaskTypes from "./taskActionTypes";

const initialState = {
  getTasksLoading: false,
  getTasksResponse: null,

  getTaskByIdLoading: false,
  getTaskByIdResponse: null,

  postTaskLoading: false,
  postTaskResponse: null,

  putTaskLoading: false,
  putTaskResponse: null,

  deleteTaskLoading: false,
  deleteTaskResponse: null,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    // GET TASKS LIST
    case TaskTypes.GET_TASKS_REQUEST:
      return {
        ...state,
        getTasksLoading: true,
      };
    case TaskTypes.GET_TASKS_RESPONSE:
      return {
        ...state,
        getTasksLoading: false,
        getTasksResponse: action.payload,
      };
    case TaskTypes.GET_TASKS_RESPONSE_CLEAR:
      return {
        ...state,
        getTasksResponse: null,
      };

    // GET TASK BY ID
    case TaskTypes.GET_TASK_BY_ID_REQUEST:
      return {
        ...state,
        getTaskByIdLoading: true,
      };
    case TaskTypes.GET_TASK_BY_ID_RESPONSE:
      return {
        ...state,
        getTaskByIdLoading: false,
        getTaskByIdResponse: action.payload,
      };
    case TaskTypes.GET_TASK_BY_ID_RESPONSE_CLEAR:
      return {
        ...state,
        getTaskByIdResponse: null,
      };

    // POST TASK
    case TaskTypes.POST_TASK_REQUEST:
      return {
        ...state,
        postTaskLoading: true,
      };
    case TaskTypes.POST_TASK_RESPONSE:
      return {
        ...state,
        postTaskLoading: false,
        postTaskResponse: action.payload,
      };
    case TaskTypes.POST_TASK_RESPONSE_CLEAR:
      return {
        ...state,
        postTaskResponse: null,
      };

    // PUT TASK
    case TaskTypes.PUT_TASK_REQUEST:
      return {
        ...state,
        putTaskLoading: true,
      };
    case TaskTypes.PUT_TASK_RESPONSE:
      return {
        ...state,
        putTaskLoading: false,
        putTaskResponse: action.payload,
      };
    case TaskTypes.PUT_TASK_RESPONSE_CLEAR:
      return {
        ...state,
        putTaskResponse: null,
      };

    // DELETE TASK
    case TaskTypes.DELETE_TASK_REQUEST:
      return {
        ...state,
        deleteTaskLoading: true,
      };
    case TaskTypes.DELETE_TASK_RESPONSE:
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskResponse: action.payload,
      };
    case TaskTypes.DELETE_TASK_RESPONSE_CLEAR:
      return {
        ...state,
        deleteTaskResponse: null,
      };

    default:
      return state;
  }
};

export default TaskReducer;
