import { Button, Form, Input, message } from "antd";
import qs from "qs";
import React, { FormEvent, useState } from "react";
import { LongButton } from ".";
import { useAuth } from "../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (val: { username: string; password: string }) => {
    register(val)
      .then((res) => {
        message.success("注册成功");
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
        <Input />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
