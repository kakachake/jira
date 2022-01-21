import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
import { ReactComponent as SoftWareLogo } from "./assets/logo.svg";
import { Button, Dropdown, Menu } from "antd";
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <SoftWareLogo width={"10rem"}></SoftWareLogo>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button type={"link"} onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"}>Hi,{user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
  );
};

const PageHeader = styled(Row)`
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
