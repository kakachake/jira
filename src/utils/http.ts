import qs from "qs";
import { getToken } from "../auth-provider";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  data?: Object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.href = "login";
      return Promise.reject({ message: "请重新登陆" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();

  console.log(user);

  //TS Utility types 联合类型 Parameter
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
let a = typeof http;

//联合类型
// let a: string | number;
// a = "string";
// a = 123;

// 类型别名，这种情况interface没法替代
// type A = string | number;
// let a2: A;

//类型别名在很多情况下可以和interface互换
//interface无法实现Utility type
type Person = {
  name: string;
  age: number;
};

const xiaoMing: Partial<Person> = { name: "xiaoming" };
const xiaoHong: Omit<Person, "name"> = { age: 18 };
