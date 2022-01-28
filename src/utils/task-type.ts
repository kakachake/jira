import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { TaskType } from "../types/task-type";
import { useHttp } from "./http";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
