import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useCreateAdminMutation } from "@/redux/api/userApi";
import { adminSchema } from "@/schemas/adminSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Modal, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";

interface IProps {
  open: boolean;
  handleClose: any;
}

type FormValues = {
  title: string;
  description: string;
};

const AdminCreate = ({ open, handleClose }: IProps) => {
  const [createAdmin] = useCreateAdminMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    message.loading("Creating.....");
    try {
      const res = await createAdmin({ ...data }).unwrap();
      if (res?.id) {
        message.success("Admin Created successfully!");
        handleClose();
      }
    } catch (err: any) {
      message.error(`${err.data}`);
    }
  };
  return (
    <Modal
      title="Create Admin"
      open={open}
      onCancel={handleClose}
      width={600}
      footer={null}
    >
      <div style={{ paddingTop: 10 }}>
        <Form submitHandler={onSubmit} resolver={yupResolver(adminSchema)}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <FormInput
                type="text"
                name="name"
                size="large"
                label="Name"
                placeholder="Type Name"
              />
            </Col>
            <Col xs={24}>
              <FormInput
                type="email"
                name="email"
                size="large"
                label="Email Address"
                placeholder="Type email address"
              />
            </Col>
            <Col xs={24}>
              <FormInput
                type="password"
                name="password"
                size="large"
                label="Password"
                placeholder="Type Title"
              />
            </Col>
            <Col xs={24}>
              <Button
                size="large"
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
              >
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default AdminCreate;
