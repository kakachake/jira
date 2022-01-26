import React, { useCallback, useState } from "react";
import * as auth from "../auth-provider";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { User } from "../screens/project-list/search-panel";
import { useMount } from "../utils";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";
import * as authStore from "../store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { bootstrap } from "../store/auth.slice";

interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return Promise.resolve(user);
};

export const AuthProvider: React.FC = ({ children }) => {
  const { run, isLoading, error, isIdle, isError } = useAsync<User>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(async () => {
    await run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const { user } = useSelector(authStore.selectUser);

  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return { user, login, register, logout };
};
