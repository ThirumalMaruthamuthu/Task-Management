import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const typeColors = {
  Research: "border-blue-500",
  Enhancement: "border-yellow-500",
  Bug: "border-red-500",
  Feature: "border-green-500",
};

const typeBadgeColors = {
  Research: "bg-blue-500",
  Enhancement: "bg-yellow-500",
  Bug: "bg-red-500",
  Feature: "bg-green-500",
};

const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

const TodoCard = ({
  type = "Todo",
  title,
  description,
  subtasks = { completed: 0, total: 0 },
  assigned = "Unassigned",
  due,
  priority = "Medium",
  onEdit,
  onDelete,
  status,
}) => {
  return (
    <div
      className={`relative flex flex-col w-72 min-h-[220px] border-l-4 ${typeColors[type]} bg-white rounded-md shadow p-4 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg break-words`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded text-white ${typeBadgeColors[type]} break-words`}
          >
            {type}
          </span>
          <h5 className="text-s font-semibold mb-1 break-words">{status}</h5>
        </div>

        <div className="flex gap-2">
          <EditIcon
            className="text-gray-500 hover:text-blue-500 cursor-pointer"
            fontSize="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit();
            }}
          />
          <DeleteIcon
            className="text-gray-500 hover:text-red-500 cursor-pointer"
            fontSize="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete();
            }}
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-1 break-words">{title}</h2>

      <p className="text-gray-600 mb-3 break-words">{description}</p>

      {subtasks.length > 0 && (
        <p className="text-sm text-gray-500 mb-2 break-words">
          Subtasks: {subtasks.length}
        </p>
      )}

      <div className="flex justify-between items-center text-sm text-gray-500 mt-auto flex-wrap gap-2">
        <span className="break-words">Assigned to : {assigned}</span>
        <span className="break-words">Due: {due}</span>
        <span
          className={`px-2 py-0.5 rounded text-white ${priorityColors[priority]} break-words`}
        >
          Priority : {priority}
        </span>
      </div>
    </div>
  );
};

export default TodoCard;
