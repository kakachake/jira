import { Button, Form, Input, message } from "antd";
import qs from "qs";
import React, { FormEvent, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/use-async";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (val: { username: string; password: string }) => {
    run(login(val))
      .then((res) => {
        message.success("登陆成功");
        navigate("/projects");
      })
      .catch((err) => {
        message.error(err.message);
        onError(err);
      });
    //下面这种写法也可以
    // try {
    //   await login(val).then((res) => {
    //     message.success("登陆成功");
    //   });
    // } catch (err: any) {
    //   message.error(err.message);
    //   onError(err);
    // }
  };
  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登陆成功，用户名：{user?.name}</div> : null}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password placeholder="密码" type="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
