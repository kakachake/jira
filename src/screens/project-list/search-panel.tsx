import { Input, Select } from "antd";
import React from "react";
import { useEffect, useState } from "react";
interface Param {
  name: string;
  personId: string;
}

export interface User {
  name: string;
  id: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface Props {
  param: Param;
  setParam: (param: Param) => void;
  users: User[];
}

export const SearchPanel: React.FC<Props> = ({ param, setParam, users }) => {
  return (
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        />
        <Select
          value={param.personId}
          onChange={(value: string) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => {
            return (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>
    </form>
  );
};
