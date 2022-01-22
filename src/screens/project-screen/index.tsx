import { useLocation, useParams } from "react-router";
import { NavLink } from "react-router-dom";

export const ProjectScreen = () => {
  const param = useParams();
  console.log(param);

  return <h1>project screen{param.projectId}</h1>;
};
