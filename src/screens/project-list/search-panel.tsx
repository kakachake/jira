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
        <input
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        />
        <select
          value={param.personId}
          onChange={(e) =>
            setParam({
              ...param,
              personId: e.target.value,
            })
          }
        >
          <option value="">负责人</option>
          {users.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};
