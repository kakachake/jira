import styled from "@emotion/styled";
import { Button, Divider, Popover, Typography } from "antd";
import { List } from "antd";
import { useState } from "react";
import { useProjects } from "../../utils/propject";

export const ProjectPopover = ({
  setProjectModalOpen,
}: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const { data: projects, isLoading, retry } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const handleHoverChange = (visible) => {
    setVisible(visible);
  };
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider></Divider>
      <Button
        onClick={() => {
          setProjectModalOpen(true);
          //关闭hover
          handleHoverChange(false);
        }}
        type={"link"}
        style={{ padding: 0 }}
      >
        创建项目
      </Button>
    </ContentContainer>
  );
  return (
    <Popover
      trigger="hover"
      visible={visible}
      placement={"bottom"}
      content={content}
      onVisibleChange={handleHoverChange}
    >
      项目
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
