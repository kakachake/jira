import { Button, Dropdown, Menu, Rate, Table, TableProps } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
//
import { NavLink, Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/propject";
import { User } from "./search-panel";

export interface Project {
  name: string;
  personId: number;
  id: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface Props extends TableProps<Project> {
  users: User[];
  refresh: () => void;
  setProjectModalOpen: (isOpen: boolean) => void;
}

export const List: React.FC<Props> = ({
  users,
  refresh,
  setProjectModalOpen,
  ...props
}) => {
  const { mutate, isSuccess, data } = useEditProject();
  //函数式编程，柯里化操作
  const PinProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin }).then(refresh);
  };
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}></Pin>,
          render(val, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={PinProject(project.id)}
              ></Pin>
            );
          },
        },
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
        {
          title: "",
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={() => {
                        setProjectModalOpen(true);
                      }}
                      key={"edit"}
                    >
                      编辑
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type="link">操作</Button>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
