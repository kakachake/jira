import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
