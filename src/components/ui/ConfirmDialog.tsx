import { Modal } from 'antd';
import React from 'react';

interface IProps {
  title?: string;
  open: boolean;
  onOk: any;
  onCancel: any;
};

const ConfirmDialog = ({
  title = 'Confirm Dialog',
  open,
  onOk,
  onCancel,
}: IProps) => {
  return (
    <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
      <p>Are you sure to do this !!!</p>
    </Modal>
  );
};

export default ConfirmDialog;
