import React from "react";
import { useUsers } from "../utils/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  const { value, onChange } = props;
  return <IdSelect options={users || []} {...props}></IdSelect>;
};
