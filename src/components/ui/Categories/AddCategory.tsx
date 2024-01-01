import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import FormTextArea from '@/components/forms/FormTextArea';
import { useCreateQuizCategoryMutation } from '@/redux/api/quizCategoryApi';
import { catSchema } from '@/schemas/catSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Modal, Row, message } from 'antd';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';

interface IProps {
  open: boolean;
  handleClose: any;
}

type FormValues = {
  title: string;
  description: string;
};

const AddCategory = ({ open, handleClose }: IProps) => {
  const [createQuizCategory] = useCreateQuizCategoryMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    message.loading('Creating.....');
    try {
      const res = await createQuizCategory({ ...data }).unwrap();
      if (res?.id) {
        message.success('Category Created successfully!');
        handleClose();
      }
    } catch (err: any) {
      message.error(`${err.data}`);
    }
  };
  return (
    <Modal
      title="Create Category"
      open={open}
      onCancel={handleClose}
      width={600}
      footer={null}
    >
      <div style={{ paddingTop: 10 }}>
        <Form submitHandler={onSubmit} resolver={yupResolver(catSchema)}>
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
                style={{ width: '100%' }}
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

export default AddCategory;
