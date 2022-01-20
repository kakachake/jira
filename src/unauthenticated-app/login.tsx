import qs from "qs";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { login, user } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(form);
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>登陆成功，用户名：{user?.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input
          type="text"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          id="password"
        />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
