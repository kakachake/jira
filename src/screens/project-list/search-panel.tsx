import { Form, Input, Select } from "antd";
import React from "react";
import { IdSelect } from "../../components/id-select";
import { UserSelect } from "../../components/user-select";
import { Project } from "./list";

export interface User {
  name: string;
  id: number;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface Props {
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: Props["param"]) => void;
  users: User[];
}

export const SearchPanel: React.FC<Props> = ({ param, setParam, users }) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          onChange={(value: number | undefined) =>
            setParam({
              ...param,
              personId: value,
            })
          }
          defaultOptionName="负责人"
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
