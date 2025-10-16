import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../Components/ToolBar";
import TodoCard from "../Components/CustomCard";
import Modal from "../Components/Modal";
import TaskForm from "./Form";
import {
  deleteTaskRequest,
  deleteTaskResponseClear,
  getTasksRequest,
} from "../Redux/TaskSaga/taskActions";

export const projects = [
  { name: "Project A", value: "Project A" },
  { name: "Project B", value: "Project B" },
  { name: "Project C", value: "Project C" },
];

export const assignees = [
  { name: "Alice", value: "Alice" },
  { name: "Bob", value: "Bob" },
  { name: "Chris", value: "Chris" },
  { name: "Domnic", value: "Domnic" },
];

export const statuses = [
  { name: "Todo", value: "Todo" },
  { name: "In Progress", value: "In Progress" },
  { name: "Review", value: "Review" },
  { name: "Done", value: "Done" },
];

export const types = [
  { name: "Bug", value: "Bug" },
  { name: "Feature", value: "Feature" },
  { name: "Task", value: "Task" },
  { name: "Enhancement", value: "Enhancement" },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    getTasksResponse,
    deleteTaskResponse,
    postTaskLoading,
    putTaskLoading,
    deleteTaskLoading,
  } = useSelector((state) => state.taskReducer);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    project: "",
    assignee: "",
    status: "",
    type: "",
    search: "",
  });

  useEffect(() => {
    dispatch(getTasksRequest());
  }, [postTaskLoading, deleteTaskLoading, putTaskLoading]);

  useEffect(() => {
    if (deleteTaskResponse) dispatch(deleteTaskResponseClear());
  }, [deleteTaskResponse]);

  const handleSearch = (values) => {
    setFilters(values);
  };

  const handleClear = () => {
    setFilters({
      project: "",
      assignee: "",
      status: "",
      type: "",
      search: "",
    });
  };

  const filteredTasks = getTasksResponse?.filter((task) => {
    return (
      (!filters.project || task.project === filters.project) &&
      (!filters.assignee || task.assignee === filters.assignee) &&
      (!filters.status || task.status === filters.status) &&
      (!filters.type || task.type === filters.type) &&
      (!filters.search ||
        task.title.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        title={editingId ? "Edit Task" : "Create New Task"}
        onClose={() => setIsOpen(false)}
      >
        <TaskForm handleClose={() => setIsOpen(false)} editingId={editingId} />
      </Modal>

      <div className="p-4 flex items-center justify-between mx-20 mt-10 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setIsOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Task
        </button>
      </div>

      <div className="p-4 flex items-center mx-20 mt-10 bg-white rounded shadow">
        <Toolbar
          projects={projects}
          assignees={assignees}
          statuses={statuses}
          types={types}
          onSearch={handleSearch}
          onClear={handleClear}
        />
      </div>

      <div className="mx-20 mt-10 flex gap-4 flex-wrap">
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((each, index) => (
            <TodoCard
              key={index}
              type={each?.type}
              title={each?.title}
              description={each?.description}
              subtasks={each?.subtasks || { completed: 0, total: 0 }}
              assigned={each?.assignee}
              due={each?.dueDate}
              status={each?.status}
              priority={each?.priority}
              onEdit={() => {
                setEditingId(each?.id);
                setIsOpen(true);
              }}
              onDelete={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  dispatch(deleteTaskRequest(each?.id));
                }
              }}
            />
          ))
        ) : (
          <p className="text-lg font-semibold text-gray-500 mt-4 w-full text-center">
            No tasks found
          </p>
        )}
      </div>
    </>
  );
};

export default HomePage;
