import Form from '@/components/forms/Form';
import FormInput from '@/components/forms/FormInput';
import FormSelectField from '@/components/forms/FormSelectField';
import { useCreateQuestionsMutation } from '@/redux/api/questionsApi';
import { useGetAllQuizCategoryQuery } from '@/redux/api/quizCategoryApi';
import { questionSchema } from '@/schemas/questionSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Input, Modal, Row, Select, message } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

interface IProps {
  open: boolean;
  handleClose: any;
}

type FormValues = {
  text: string;
  quizCategoryId: string;
};

const AddQuestion = ({ open, handleClose }: IProps) => {
  const [text, setText] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctOptions, setCorrectOptions] = useState<string[]>([]);

  const handleAddOption = (value: string) => {
    if (value) {
      setOptions([...options, value]);
      setText('');
    }
  };
  const handleRemoveOption = (item: string) => {
    setOptions(options.filter((el: string) => el !== item));
  };

  // library
  const { data: categoryData } = useGetAllQuizCategoryQuery(
    { limit: 100 },
    { refetchOnMountOrArgChange: true }
  );

  const allQuizCategories = categoryData?.quizCategories || [];
  // end library

  const [createQuestions] = useCreateQuestionsMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    if (!options.length || !correctOptions.length) {
      return message.warning('Please add options');
    }
    message.loading('Creating.....');
    const newData = {
      ...data,
      options,
      correctOptions,
    };
    try {
      const res = await createQuestions({ ...newData }).unwrap();
      if (res?.id) {
        message.success('Question Created successfully!');
        handleClose();
      }
    } catch (err: any) {
      message.error(`${err.data}`);
    }
  };
  return (
    <Modal
      title="Create Question"
      open={open}
      onCancel={handleClose}
      width={700}
      footer={null}
    >
      <div style={{ paddingTop: 10 }}>
        <Form submitHandler={onSubmit} resolver={yupResolver(questionSchema)}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <FormSelectField
                size="large"
                name="quizCategoryId"
                options={allQuizCategories?.map((el) => ({
                  label: el.title,
                  value: el.id,
                }))}
                label="Category"
                placeholder="Select Category"
              />
            </Col>
            <Col xs={24} md={12}>
              <FormInput
                type="text"
                name="text"
                size="large"
                label="Question"
                placeholder="Type Question"
              />
            </Col>
            <Col xs={24} md={12}>
              Add Option
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  type="text"
                  size="large"
                  placeholder="Type Question"
                  style={{ marginRight: 10 }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={() => handleAddOption(text)}
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <p>Added Options</p>
              {options?.map((el) => (
                <p
                  key={el}
                  style={{
                    display: 'inline-block',
                    padding: '3px 7px',
                    border: '1px solid #666',
                    borderRadius: 5,
                    margin: '0 7px 7px 0',
                  }}
                >
                  {el}{' '}
                  <span>
                    <CloseOutlined
                      style={{ cursor: 'pointer', color: 'red' }}
                      onClick={() => handleRemoveOption(el)}
                    />
                  </span>
                </p>
              ))}
            </Col>
            <Col xs={24}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                options={options?.map((el) => ({ label: el, value: el }))}
                onChange={(value: string[]) => setCorrectOptions(value)}
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

export default AddQuestion;
