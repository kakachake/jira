import { Button, Card, Divider } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "../assets/logo.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container>
      <Background />
      <Header />
      <ShadowCard>
        <Title>注册 | 登录</Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          切换到<b> {isRegister ? `登录` : "注册"}</b>
        </a>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  padding: 3.2rem 4rem;
  text-align: center;
  background-color: #f8f8f8;
  transition: all 0.3s;
  border-radius: 0.3rem;
  &:hover {
    box-shadow: 0 20px 25px -20px #4b6bf7c7;
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.header`
  position: absolute;
  top: 5rem;
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 12rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${left}), url(${right});
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
`;
