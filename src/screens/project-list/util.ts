import { useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";

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
