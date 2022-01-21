import { Button, Form, Input, message } from "antd";
import qs from "qs";
import React, { FormEvent, useState } from "react";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { login, user } = useAuth();

  const handleSubmit = (val: { username: string; password: string }) => {
    login(val)
      .then((res) => {
        message.success("登陆成功");
      })
      .catch((res) => {
        message.error(res.message);
      });
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
        <LongButton htmlType="submit" type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
