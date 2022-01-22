import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
//
import { NavLink, Link } from "react-router-dom";
import { User } from "./search-panel";

export interface Project {
  name: string;
  personId: string;
  id: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface Props extends TableProps<Project> {
  users: User[];
}

export const List: React.FC<Props> = ({ users, ...props }) => {
  // console.log(users);

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          render(val, project) {
            return <Link to={project.id.toString()}>{project.name}</Link>;
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span key={project.personId}>
                {users.find((u) => {
                  return u.id === project.personId;
                })?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span key={project.created}>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
