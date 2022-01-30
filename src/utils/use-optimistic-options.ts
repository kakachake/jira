import { Query, QueryKey, useQueryClient } from "react-query";
import { Task } from "../types/task";
import { reorder } from "./reorder";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return (
      old?.filter((item) => {
        return item.id !== target;
      }) || []
    );
  });

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return (
      old?.map((project) =>
        project.id === target.id ? { ...project, ...target } : project
      ) || []
    );
  });

export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old ? [...old, target] : [target];
  });

export const useDragConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    if (old) {
      const item = old[target.fromIndex];
      old.splice(target.fromIndex, 1);
      old.splice(target.toIndex, 0, item);
      return old;
    } else {
      return [];
    }
  });

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
    return [];
  });
