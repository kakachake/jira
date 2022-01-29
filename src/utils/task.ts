import { QueryKey, useMutation, useQuery } from "react-query";
import { useDebounce } from ".";
import { Kanban } from "../types/kanban";
import { Task } from "../types/task";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };
  return useQuery<Task[]>(["tasks", debouncedParam], () =>
    client("tasks", { data: debouncedParam })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: Partial<Task>) => {
    return client(`tasks`, {
      data: params,
      method: "POST",
    });
  }, useAddConfig(queryKey));
};

//react-query版本
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) => {
      console.log(params);

      return client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      ...useEditConfig(queryKey),
    }
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: !!id, //id ? true : false,只有id有值时才去触发
  });
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((id: number) => {
    return client(`tasks/${id}`, {
      method: "DELETE",
    });
  }, useDeleteConfig(queryKey));
};
