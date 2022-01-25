import { Button, Drawer } from "antd";

export const ProjectModal = ({
  projectModalOpen,
  onClose,
}: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer onClose={onClose} visible={projectModalOpen} width={"100%"}>
      <h1>Drawer</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
