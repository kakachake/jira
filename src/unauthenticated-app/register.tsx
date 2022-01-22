import { Button, Form, Input, message } from "antd";
import qs from "qs";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";
import { useAsync } from "../utils/use-async";
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const navigate = useNavigate();
  const handleSubmit = ({
    cpassword,
    ...val
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== val.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    run(register(val))
      .then((res) => {
        message.success("注册成功");
        navigate("/projects");
      })
      .catch((err) => {
        message.error(err.message);
        onError(err);
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
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }, {}]}
      >
        <Input.Password placeholder="请确认密码" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
