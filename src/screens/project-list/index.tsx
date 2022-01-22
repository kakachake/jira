import React from "react";
import { List, Project } from "./list";
import { SearchPanel, User } from "./search-panel";
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

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 200);
  // const throttleParam = useThrottle(param, 2000);
  const client = useHttp();

  useMount(() => {
    client(`users`).then(setUsers);
  });
  const { isLoading, error, data: list } = useProjects(debounceParam);

  useDocumentTitile("项目列表", false);

  return (
    <>
      <Container>
        <h1>项目列表</h1>
        {/* <TsReactTest /> */}
        <SearchPanel param={param} users={users} setParam={setParam} />
        <List loading={isLoading} users={users} dataSource={list || []} />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
