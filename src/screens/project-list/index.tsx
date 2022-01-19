import React from "react";
import { List } from "./list";
import { SearchPanel, User } from "./search-panel";
import { TsReactTest } from "./try-use-arry";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject, useMount, useDebounce, useThrottle } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen: React.FC = () => {
  const [users, setUsers]: [User[], Function] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 200);
  // const throttleParam = useThrottle(param, 2000);
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, [debounceParam]);

  return (
    <>
      <div>
        <TsReactTest />
        <SearchPanel param={param} users={users} setParam={setParam} />
        <List users={users} list={list} />
      </div>
    </>
  );
};