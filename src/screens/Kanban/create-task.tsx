import { Card, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { TaskTypeSelect } from "../../components/task-type-select";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { CloseOutlined } from "@ant-design/icons";
import { Row } from "../../components/lib";
export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [task, setTask] = useState({
    name: "",
    typeId: 0,
  });
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ ...task, projectId, kanbanId });
    setInputMode(false);
    setTask({ name: "", typeId: 0 });
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }
  return (
    <Card onBlur={toggle}>
      <div onClick={toggle} style={{ textAlign: "right", cursor: "pointer" }}>
        <CloseOutlined />
      </div>
      <Row>
        <Input
          onBlur={toggle}
          placeholder={"需要做些什么"}
          autoFocus={true}
          onPressEnter={submit}
          onChange={(evt) =>
            setTask({
              ...task,
              name: evt.target.value,
            })
          }
        ></Input>
        <TaskTypeSelect
          onChange={(val) =>
            setTask({
              ...task,
              typeId: val || 0,
            })
          }
          value={task.typeId}
          onBlur={toggle}
          defaultOptionName="选择类型"
        />
      </Row>
    </Card>
  );
};
