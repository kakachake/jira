import { useCallback, useEffect } from "react";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { cleanObject } from ".";
import { Project } from "../screens/project-list/list";
import { useProjectsSearchParams } from "../screens/project-list/util";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

//react - query版本;
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  //["projects", param]中param变化时，请求就会再次被触发
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};
// export const useProjects = (param?: Partial<Project>) => {
//   // 这里的run不是state,也不是基本类型，如果将其放在useEffect第二个参数，则每次对比run时都会返回不一样，导致
//   // 页面循环被渲染，最终卡死。
//   const { run, ...result } = useAsync<Project[]>();
//   const client = useHttp();
//   const fetchProjects = useCallback(
//     () => client("projects", { data: cleanObject(param || {}) }),
//     [client, param]
//   );
//   useEffect(() => {
//     run(fetchProjects(), {
//       retry: fetchProjects,
//     });
//   }, [param, run, fetchProjects]);
//   return result;
// };

//react-query版本
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) => {
      console.log(params);

      return client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      });
    },
    {
      ...useEditConfig(queryKey),
    }
  );
};
// export const useEditProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: "PATCH",
//       })
//     );
//   };
//   return {
//     mutate,
//     ...asyncResult,
//   };
// };

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: Partial<Project>) => {
    return client(`projects`, {
      data: params,
      method: "POST",
    });
  }, useAddConfig(queryKey));
};

// export const useAddProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: "POST",
//       })
//     );
//   };
//   return {
//     mutate,
//     ...asyncResult,
//   };
// };

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((id: number) => {
    return client(`projects/${id}`, {
      method: "DELETE",
    });
  }, useDeleteConfig(queryKey));
};

export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id, //id ? true : false,只有id有值时才去触发
    }
  );
};
