import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";

import { useDebounce, useDocumentTitile } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/propject";
import { Button } from "antd";
import { useProjectsSearchParams } from "./util";
import { useUsers } from "../../utils/user";
import { Row } from "../../components/lib";
import { projectListActions } from "./project-list.slice";
import { useDispatch } from "react-redux";

export const ProjectListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [param, setParam] = useProjectsSearchParams();

  const debounceParam = useDebounce(param, 200);
  console.log(debounceParam);
  // const throttleParam = useThrottle(param, 2000);
  const { data: users } = useUsers();
  const { isLoading, data: list, retry } = useProjects(debounceParam);
  useDocumentTitile("项目列表", false);

  return (
    <>
      <Container>
        <Row between={true}>
          <h1>项目列表</h1>
          <Button
            type={"link"}
            onClick={() => dispatch(projectListActions.openProjectModal())}
          >
            创建项目
          </Button>
        </Row>

        {/* <TsReactTest /> */}
        <Row style={{ margin: "5px 0" }}>
          <SearchPanel param={param} users={users || []} setParam={setParam} />
          <Button onClick={retry}>刷新</Button>
        </Row>
        <List
          refresh={retry}
          loading={isLoading}
          users={users || []}
          dataSource={list || []}
        />
      </Container>
    </>
  );
};

ProjectListScreen["whyDidYouRender"] = true;

const Container = styled.div`
  padding: 3.2rem;
`;
