import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { KanbanScreen } from "../kanban";
import { EpicScreen } from "../epic";

export const ProjectScreen = () => {
  const param = useParams();
  console.log(param);

  return (
    <div>
      <h1>project screen{param.projectId}</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        <Route path={"/epic"} element={<EpicScreen />}></Route>
        <Route
          path={"/*"}
          element={
            <Navigate
              to={window.location.pathname + "/kanban"}
              replace={true}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};
