import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
