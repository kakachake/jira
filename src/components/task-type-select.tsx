import React from "react";
import { useTaskTypes } from "../utils/task-type";
import { IdSelect } from "./id-select";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: tasks } = useTaskTypes();
  return <IdSelect options={tasks || []} {...props}></IdSelect>;
};
