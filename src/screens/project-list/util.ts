import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProject } from "../../utils/propject";
import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return useMemo(
    () =>
      [
        {
          ...param,
          personId: Number(param.personId) || undefined,
        },
        setParam,
      ] as const,
    [param]
  );
};

export const useProjectsQueryKey = () => [
  "projects",
  useProjectsSearchParams()[0],
];

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };
  const startEdit = (id: number) => {
    setEditingProjectId({ editingProjectId: id });
  };

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
