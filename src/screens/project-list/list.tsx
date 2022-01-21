import { Table } from "antd";
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
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((u) => {
                  return u.id === project.personId;
                })?.name || "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
