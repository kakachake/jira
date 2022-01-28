import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { User } from "../../types/User";
import { TsReactTest } from "./try-use-arry";
import { useEffect, useState } from "react";
import qs from "qs";
import {
  cleanObject,
  useMount,
  useDebounce,
  useThrottle,
  useDocumentTitile,
} from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { useAsync } from "../../utils/use-async";
import { useProjects } from "../../utils/propject";
import { Button, Typography } from "antd";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { useUsers } from "../../utils/user";
import { ErrorBox, Row } from "../../components/lib";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen: React.FC = () => {
  console.log("ProjectListScreen");

  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();

  // const throttleParam = useThrottle(param, 2000);
  const { data: users } = useUsers();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));

  useDocumentTitile("项目列表", false);

  return (
    <>
      <Container>
        <Row between={true}>
          <h1>项目列表</h1>
          <Button type={"link"} onClick={() => open()}>
            创建项目
          </Button>
        </Row>

        {/* <TsReactTest /> */}
        <Row style={{ margin: "5px 0" }}>
          <SearchPanel param={param} users={users || []} setParam={setParam} />
          <Button onClick={() => {}}>刷新</Button>
        </Row>
        {error ? <ErrorBox error={error}></ErrorBox> : null}
        <List
          refresh={() => {}}
          loading={isLoading}
          users={users || []}
          dataSource={list || []}
        />
      </Container>
    </>
  );
};

// ProjectListScreen["whyDidYouRender"] = true;

const Container = styled.div`
  padding: 3.2rem;
`;
