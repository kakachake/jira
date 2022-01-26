import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
import { ReactComponent as SoftWareLogo } from "./assets/logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { ProjectScreen } from "./screens/project-screen";
import { BrowserRouter } from "react-router-dom";
import { resetRoute } from "./utils";
import React, { useState } from "react";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./screens/project-list/project-popover";
import { useUndo } from "./utils/use-undo";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <div>
      <PageHeader
        projectButton={
          <Button
            onClick={() => {
              setProjectModalOpen(true);
            }}
            type={"link"}
            style={{ padding: 0 }}
          >
            创建项目
          </Button>
        }
      />
      {/* undo测试 */}
      <Test />
      <Main>
        <Routes>
          <Route
            path={"/"}
            element={
              <ProjectListScreen
                projectButton={
                  <Button
                    onClick={() => {
                      setProjectModalOpen(true);
                    }}
                    type={"link"}
                    style={{ padding: 0 }}
                  >
                    创建项目
                  </Button>
                }
              />
            }
          />
          <Route path={"/:projectId/*"} element={<ProjectScreen />}></Route>
        </Routes>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
};

//undo测试
const Test = () => {
  const [
    { past, present: presentCount, future },
    {
      set: setCount,
      reset: resetCount,
      undo: undoCount,
      redo: redoCount,
      canRedo,
      canUndo,
    },
  ] = useUndo<number>(0);
  return (
    <>
      <div>past数组：{past.join()}</div>
      <div>当前值：{presentCount}</div>
      <div>future数组：{future.join()}</div>
      <Button key="increment" onClick={() => setCount(presentCount + 1)}>
        +
      </Button>{" "}
      <Button key="decrement" onClick={() => setCount(presentCount - 1)}>
        -
      </Button>{" "}
      <Button key="undo" onClick={undoCount} disabled={!canUndo}>
        undo
      </Button>{" "}
      <Button key="redo" onClick={redoCount} disabled={!canRedo}>
        redo
      </Button>
      <Button key="reset" onClick={() => resetCount(0)}>
        reset to 0
      </Button>
    </>
  );
};

const PageHeader = ({ projectButton }: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ height: "100%" }} type={"link"} onClick={resetRoute}>
          <SoftWareLogo
            style={{ display: "block" }}
            width={"10rem"}
          ></SoftWareLogo>
        </Button>
        <ProjectPopover projectButton={projectButton} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const HandleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item>
            <Button type={"link"} onClick={HandleLogout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>Hi,{user?.name}</Button>
    </Dropdown>
  );
};

//const: temporal dead zone(暂时性死区)
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  height: 6rem;
  overflow: hidden;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6.4rem);
`;
