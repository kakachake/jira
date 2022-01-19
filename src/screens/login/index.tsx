import qs from "qs";
import React, { FormEvent, useState } from "react";
import { cleanObject } from "../../utils";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
        console.log("succ");
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    login(form);
  };
  return (
    <form onSubmit={handleSubmit}>
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
