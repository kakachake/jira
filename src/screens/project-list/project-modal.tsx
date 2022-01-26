import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen,
} from "./project-list.slice";
export const ProjectModal = () => {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(projectListActions.closeProjectModal());
  };
  const projectModalOpen = useSelector(selectProjectModalOpen);

  return (
    <Drawer onClose={onClose} visible={projectModalOpen} width={"100%"}>
      <h1>Drawer</h1>
      <Button type={"link"} onClick={onClose}>
        创建项目
      </Button>
    </Drawer>
  );
};
