import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </div>
  );
};

const PageHeader = styled(Row)``;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
