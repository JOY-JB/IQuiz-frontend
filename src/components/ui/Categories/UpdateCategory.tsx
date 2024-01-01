import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { useUpdateCategoryMutation } from "@/redux/api/quizCategoryApi";
import { catSchema } from "@/schemas/catSchema";
import { IQuizCategory } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Modal, Row, message } from "antd";
import { SubmitHandler } from "react-hook-form";

interface IProps {
  open: boolean;
  handleClose: any;
  preData: IQuizCategory;
}

type FormValues = {
  title: string;
  description: string;
};

const UpdateCategory = ({ open, handleClose, preData }: IProps) => {
  const [updateCategory] = useUpdateCategoryMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      message.loading("Updating.....");
      const res = await updateCategory({
        id: preData?.id,
        body: data,
      }).unwrap();
      if (res?.id) {
        message.success("Category Updated successfully!");
        handleClose();
      }
    } catch (err: any) {
      message.error(`${err.data}`);
    }
  };

  const defaultValues = {
    title: preData?.title || "",
    description: preData?.description || "",
  };
  return (
    <Modal
      title="Update Category"
      open={open}
      onCancel={handleClose}
      width={600}
      footer={null}
    >
      <div style={{ paddingTop: 10 }}>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(catSchema)}
          defaultValues={defaultValues}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <FormInput
                type="text"
                name="title"
                size="large"
                label="Title"
                placeholder="Type Title"
              />
            </Col>
            <Col xs={24}>
              <FormTextArea
                name="description"
                rows={2}
                label="Description"
                placeholder="Type Description"
              />
            </Col>
            <Col xs={24}>
              <Button
                size="large"
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
              >
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateCategory;
