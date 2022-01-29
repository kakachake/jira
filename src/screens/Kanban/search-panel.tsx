import { Button, Input } from "antd";
import { Row } from "../../components/lib";
import { TaskTypeSelect } from "../../components/task-type-select";
import { UserSelect } from "../../components/user-select";
import { useSetUrlSearchParam } from "../../utils/url";
import { useTasksSearchParams } from "./util";

export const SearchPanel = () => {
  const [searchParams, setSearchParams] = useTasksSearchParams();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={1} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName="经办人"
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      ></TaskTypeSelect>
      <Button onClick={reset}>清除</Button>
    </Row>
  );
};
