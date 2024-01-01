import { IQuizCategory } from '@/types';
import { Button, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDeleteCategoryMutation } from '@/redux/api/quizCategoryApi';
import ConfirmDialog from '../ConfirmDialog';
import UpdateCategory from './UpdateCategory';

interface IProps {
  data: IQuizCategory;
}

const CategoriesAction = ({ data }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      message.loading('Deleting.....');
      setConfirm(false);
      const res = await deleteCategory(data?.id).unwrap();
      if (res) {
        message.success('Category Successfully Deleted!');
      }
    } catch (error: any) {
      message.error(`${error.data}`);
    }
  };

  return (
    <>
      <Button
        size="small"
        style={{
          margin: '0px 5px',
        }}
        onClick={() => setOpen(true)}
        type="primary"
      >
        <EditOutlined />
      </Button>
      <Button
        size="small"
        type="primary"
        onClick={() => {
          setConfirm(true);
        }}
        danger
        style={{ marginLeft: '3px' }}
      >
        <DeleteOutlined />
      </Button>
      {/* popup items */}
      <UpdateCategory
        open={open}
        handleClose={() => setOpen(false)}
        preData={data}
      />
      <ConfirmDialog
        title="Delete Category"
        open={confirm}
        onOk={handleDelete}
        onCancel={() => setConfirm(false)}
      />
      {/* end popup items */}
    </>
  );
};

export default CategoriesAction;
