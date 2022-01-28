import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
import { ReactComponent as SoftWareLogo } from "./assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { ProjectScreen } from "./screens/project-screen";

import { resetRoute } from "./utils";

import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./screens/project-list/project-popover";

export const AuthenticatedApp = () => {
  return (
    <div>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"/"} element={<ProjectListScreen />} />
          <Route path={"/:projectId/*"} element={<ProjectScreen />}></Route>
        </Routes>
      </Main>
      <ProjectModal />
    </div>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ height: "100%" }} type={"link"} onClick={resetRoute}>
          <SoftWareLogo
            style={{ display: "block" }}
            width={"18rem"}
          ></SoftWareLogo>
        </Button>
        <ProjectPopover />
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
