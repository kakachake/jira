import React from "react";
import { User } from "./search-panel";

interface Project {
  name: string;
  personId: string;
  id: string;
  pin: boolean;
  organization: string;
}

interface Props {
  list: Project[];
  users: User[];
}

export const List: React.FC<Props> = ({ list, users }) => {
  // console.log(users);
  return (
    <table style={{ margin: "0 auto" }}>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((p, i) => (
          <tr key={i}>
            <td key={p.name}>{p.name}</td>
            <td key={p.personId}>
              {users.find((u) => {
                return u.id === p.personId;
              })?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
