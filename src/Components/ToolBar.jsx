import React, { useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import InputField from "./InputField";
import Dropdown from "./Dropdown";
import * as Yup from "yup";
import Button from "./CustomButton";

const Watcher = ({ onSearch }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    onSearch(values);
  }, [values]);

  return null;
};

const Toolbar = ({
  projects,
  assignees,
  statuses,
  types,
  onSearch,
  onClear,
}) => {
  const initialValues = {
    search: "",
    project: "",
    assignee: "",
    status: "",
    type: "",
  };

  const validationSchema = Yup.object({
    search: Yup.string(),
    project: Yup.string(),
    assignee: Yup.string(),
    status: Yup.string(),
    type: Yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue, errors, touched, handleBlur }) => (
        <Form className=" bg-white flex items-center gap-4 overflow-x-auto">
          <Watcher onSearch={onSearch} />

          <div className="flex-shrink-0 w-48">
            <InputField
              label=""
              name="search"
              value={values.search}
              onChange={(e) => setFieldValue("search", e.target.value)}
              onBlur={handleBlur}
              error={errors.search}
              touched={touched.search}
              placeholder="Search tasks..."
            />
          </div>

          <div className="flex-shrink-0 w-40">
            <Dropdown
              name="project"
              value={values.project}
              onChange={(e) => setFieldValue("project", e.target.value)}
              onBlur={handleBlur}
              data={projects}
              error={errors.project}
              touched={touched.project}
            />
          </div>

          <div className="flex-shrink-0 w-40">
            <Dropdown
              name="assignee"
              value={values.assignee}
              onChange={(e) => setFieldValue("assignee", e.target.value)}
              onBlur={handleBlur}
              data={assignees}
              error={errors.assignee}
              touched={touched.assignee}
            />
          </div>

          <div className="flex-shrink-0 w-40">
            <Dropdown
              name="status"
              value={values.status}
              onChange={(e) => setFieldValue("status", e.target.value)}
              onBlur={handleBlur}
              data={statuses}
              error={errors.status}
              touched={touched.status}
            />
          </div>

          <div className="flex-shrink-0 w-40">
            <Dropdown
              name="type"
              value={values.type}
              onChange={(e) => setFieldValue("type", e.target.value)}
              onBlur={handleBlur}
              data={types}
              error={errors.type}
              touched={touched.type}
            />
          </div>

          <div className="mb-4">
            <Button
              label="Clear Filters"
              variant="filter"
              onClick={() => {
                onClear();
                Object.keys(initialValues).forEach((key) =>
                  setFieldValue(key, "")
                );
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Toolbar;
