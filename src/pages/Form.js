import React, { useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropdown from "../Components/Dropdown";
import InputField from "../Components/InputField";
import Button from "../Components/CustomButton";
import {
  getTaskByIdRequest,
  postTaskRequest,
  postTaskResponseClear,
  putTaskRequest,
  putTaskResponseClear,
} from "../Redux/TaskSaga/taskActions";
import { useDispatch, useSelector } from "react-redux";
import { assignees, projects, statuses, types } from "./HomePage";

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  priority: Yup.string().required("Required"),
  project: Yup.string().required("Required"),
  assignee: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const TaskForm = ({ editingId, handleClose, postUserLoading }) => {
  const dispatch = useDispatch();

  const { getTaskByIdResponse, postTaskResponse, putTaskResponse } =
    useSelector((state) => state.taskReducer);

  useEffect(() => {
    if (editingId) {
      dispatch(getTaskByIdRequest(editingId));
    }
  }, [editingId, dispatch]);

  useEffect(() => {
    if (postTaskResponse) {
      handleClose();
      dispatch(postTaskResponseClear());
    }
  }, [postTaskResponse]);

  useEffect(() => {
    if (putTaskResponse) {
      handleClose();
      dispatch(putTaskResponseClear());
    }
  }, [putTaskResponse]);

  const initialValues = {
    title: getTaskByIdResponse?.title || "",
    type: getTaskByIdResponse?.type || "",
    priority: getTaskByIdResponse?.priority || "",
    project: getTaskByIdResponse?.project || "",
    assignee: getTaskByIdResponse?.assignee || "",
    description: getTaskByIdResponse?.description || "",
    dueDate: getTaskByIdResponse?.dueDate || "",
    subtasks: getTaskByIdResponse?.subtasks || [],
    status: getTaskByIdResponse?.status || "Todo",
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (editingId) {
          dispatch(putTaskRequest(values, editingId));
        } else {
          dispatch(postTaskRequest(values));
        }
      }}
    >
      {(formik) => (
        <Form className="space-y-4 mb-8">
          <InputField
            label="Title"
            name="title"
            placeholder="Enter task title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.title}
            touched={formik.touched.title}
          />

          <Dropdown
            label="Type"
            name="type"
            data={types}
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.type}
            touched={formik.touched.type}
          />

          <Dropdown
            label="Priority"
            name="priority"
            data={[
              { name: "High", value: "High" },
              { name: "Medium", value: "Medium" },
              { name: "Low", value: "Low" },
            ]}
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.priority}
            touched={formik.touched.priority}
          />

          <Dropdown
            label="Project"
            name="project"
            data={projects}
            value={formik.values.project}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.project}
            touched={formik.touched.project}
          />

          <Dropdown
            label="Assignee"
            name="assignee"
            data={assignees}
            value={formik.values.assignee}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.assignee}
            touched={formik.touched.assignee}
          />

          <Dropdown
            label="Status"
            name="status"
            data={statuses}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.status}
            touched={formik.touched.status}
          />

          <InputField
            label="Description"
            name="description"
            placeholder="Enter description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.description}
            touched={formik.touched.description}
            textarea
          />

          <InputField
            label="Due Date"
            name="dueDate"
            type="date"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.dueDate}
            touched={formik.touched.dueDate}
          />

          {/* Subtasks */}
          <FieldArray name="subtasks">
            {({ push, remove }) => (
              <div className="space-y-2">
                <label className="font-medium">Subtasks</label>
                {formik.values.subtasks.map((subtask, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <InputField
                      placeholder={`Subtask ${index + 1}`}
                      name={`subtasks[${index}]`}
                      value={subtask}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.subtasks && formik.errors.subtasks[index]
                      }
                      touched={
                        formik.touched.subtasks &&
                        formik.touched.subtasks[index]
                      }
                    />
                    <button
                      type="button"
                      className="p-1 rounded bg-red-100 hover:bg-red-200"
                      onClick={() => remove(index)}
                    >
                      <DeleteIcon fontSize="small" className="text-red-500" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="flex items-center gap-1 text-blue-500 font-medium mt-2"
                  onClick={() => push("")}
                >
                  <AddIcon fontSize="small" />
                  Add Subtask
                </button>
              </div>
            )}
          </FieldArray>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="submit"
              variant="primary"
              label={editingId ? "Update" : "Submit"}
              isLoading={postUserLoading}
            />

            <Button
              type="button"
              variant="secondary"
              label="Cancel"
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
