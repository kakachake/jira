import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTaskTypes } from "../../utils/task-type";
import { useKanbansQueryKey, useTaskModal, useTasksSearchParams } from "./util";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal, Spin } from "antd";
import { Loading, Row } from "../../components/lib";
import { CreateTask } from "./create-task";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { useDeleteKanban } from "../../utils/kanban";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const [{ name: keyword }] = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem" }}
      key={task.name}
    >
      <Mark keyword={keyword} name={task.name}></Mark>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks, isLoading } = useTasks(useTasksSearchParams()[0]);
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban}></More>
      </Row>
      <TaskContainer>
        <Loading loading={isLoading}>
          {tasks?.map((task) => (
            <TaskCard task={task} />
          ))}
          <CreateTask kanbanId={kanban.id} />
        </Loading>
      </TaskContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗？",
      onOk() {
        mutateAsync(kanban.id);
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item onClick={startEdit}>删除</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin: 1.5rem 1.5rem 1.5rem 0;
  border: 1px solid transparent;
  transition: all 0.3s;
  &:hover {
    border: 1px solid #2aa74f;
    box-shadow: 0 0 15px -7px #2aa74f;
  }
`;

const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
