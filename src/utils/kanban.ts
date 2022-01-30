import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useDragConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((id: number) => {
    return client(`kanbans/${id}`, {
      method: "DELETE",
    });
  }, useDeleteConfig(queryKey));
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: Partial<Kanban>) => {
    return client(`kanbans`, {
      data: params,
      method: "POST",
    });
  }, useAddConfig(queryKey));
};

export interface SortProps {
  // 要重新排序的item
  fromId: number;
  //目标item
  referenceId: number;
  //放在目标item的前或后
  type: "before" | "after";
  fromIndex?: number;
  toIndex?: number;
  fromKanbanId?: number;
  toKanbanId?: number;
  fromTaskInKanbanIndex?: number;
  toTaskInKanbanIndex?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useDragConfig(queryKey));
};
