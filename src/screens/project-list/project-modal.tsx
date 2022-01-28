import { Button, Drawer, Form, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "../../components/lib";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "../../utils/propject";
import { useProjectModal, useProjectsQueryKey } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  console.log(projectModalOpen);

  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };
  const closeModal = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"40%"}
    >
      {isLoading ? (
        <Spin size="large"></Spin>
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={"vertical"}
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={"名称"}
              name={"name"}
              rules={[{ required: true, message: "请输入项目名" }]}
            >
              <input placeholder="请输入项目名称" />
            </Form.Item>
            <Form.Item
              label={"部门"}
              name={"organization"}
              rules={[{ required: true, message: "请输入部门名" }]}
            >
              <input placeholder="请输入部门名" />
            </Form.Item>
            <Form.Item label={"负责人"} name={"personId"}>
              {/* form.item会自动为输入框/选择框等加入value和onchange属性 */}
              <UserSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item>
              <Button
                // loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  );
};
