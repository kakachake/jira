import { useEffect } from "react";
import { User } from "../screens/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
