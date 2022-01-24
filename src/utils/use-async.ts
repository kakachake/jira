import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success"; //未发生|正在发生|出现错误|成功
}

const defaultInitialState: State<null> = {
  status: "idle",
  error: null,
  data: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const [retry, setRetry] = useState(() => () => {});
  const setData = (data: D | null) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  // run用来触发异步请求
  const run = (
    promise: Promise<D | null>,
    runConfig?: {
      retry: () => Promise<D | null>;
    }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型数据");
    }
    if (runConfig?.retry) {
      setRetry(() => () => {
        run(runConfig?.retry());
      });
    }
    setState({ ...state, status: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        //catch会消化异常，需主动抛出
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    data: state.data,
    error: state.error,
    run,
    setData,
    setError,
    state,
    //retry 被调用时重新跑一边run，让state刷新一遍
    retry,
  };
};
