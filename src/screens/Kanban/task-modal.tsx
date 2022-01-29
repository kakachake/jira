import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { TaskTypeSelect } from "../../components/task-type-select";
import { UserSelect } from "../../components/user-select";
import { useDeleteTask, useEditTask } from "../../utils/task";
import {
  useKanbansQueryKey,
  useTaskModal,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const { editingTask, editingTaskId, close } = useTaskModal();
  const [form] = useForm();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  const deleteModal = (id) => {
    Modal.confirm({
      onOk: () => deleteTask(id).then(close),
      okText: "确定",
      cancelText: "取消",
      title: "确定要删除吗",
    });
  };

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      forceRender={true}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form initialValues={editingTask} form={form} {...layout}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect defaultOptionName={"类型"} />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button onClick={() => deleteModal(editingTaskId)} size={"small"}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
