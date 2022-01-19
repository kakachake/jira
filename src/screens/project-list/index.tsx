import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject, useMount, useDebounce, useThrottle } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen: React.FC = () => {
  const [users, setUsers] = useState([]);
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
        <SearchPanel param={param} users={users} setParam={setParam} />
        <List users={users} list={list} />
      </div>
    </>
  );
};
