import { Input } from "antd";
import { useState } from "react";
import { ColumnsContainner } from ".";
import { useAddKanban } from "../../utils/kanban";
import { Container } from "./kanban-column";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async (val) => {
    console.log(val);

    await addKanban({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
        size={"large"}
        placeholder={"新建面板名称"}
      ></Input>
    </Container>
  );
};
