import { useEffect } from "react";
import { useQuery } from "react-query";
import { User } from "../types/User";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", param], () => {
    return client("users", { data: param });
  });
};
