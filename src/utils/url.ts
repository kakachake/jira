import { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from ".";

//使用泛型，使得返回的参数类型key与传入的keys相同
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // const location = useLocation();
  // const params = useParams();
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      console.log(params);

      return setSearchParam(params);
    },
  ] as const;
};

//const a = [12, "13", { id: 14 }] as const;

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
