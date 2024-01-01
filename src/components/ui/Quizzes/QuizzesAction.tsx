import { useDeleteQuestionsMutation } from "@/redux/api/questionsApi";
import { IQuestions } from "@/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";
import ConfirmDialog from "../ConfirmDialog";
import UpdateQuestion from "./UpdateQuestion";

interface IProps {
  data: IQuestions;
}

const QuizzesAction = ({ data }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  const [deleteQuestions] = useDeleteQuestionsMutation();

  const handleDelete = async () => {
    try {
      message.loading("Deleting.....");
      setConfirm(false);
      const res = await deleteQuestions(data?.id).unwrap();
      if (res) {
        message.success("Question Successfully Deleted!");
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
          margin: "0px 5px",
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
        style={{ marginLeft: "3px" }}
      >
        <DeleteOutlined />
      </Button>
      {/* popup items */}
      <UpdateQuestion
        open={open}
        handleClose={() => setOpen(false)}
        preData={data}
      />
      <ConfirmDialog
        title="Delete Question"
        open={confirm}
        onOk={handleDelete}
        onCancel={() => setConfirm(false)}
      />
      {/* end popup items */}
    </>
  );
};

export default QuizzesAction;
