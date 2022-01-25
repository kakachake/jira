import { useCallback, useEffect } from "react";
import { cleanObject } from ".";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  // 这里的run不是state,也不是基本类型，如果将其放在useEffect第二个参数，则每次对比run时都会返回不一样，导致
  // 页面循环被渲染，最终卡死。
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run, fetchProjects]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
