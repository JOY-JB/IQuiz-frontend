import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ButtonType } from 'antd/es/button';

type CardActionProps = {
  title?: string;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLElement>;
  tooltipColor?: string;
  icon?: React.ReactNode;
};

const CardAction = ({
  title,
  type = 'primary',
  onClick,
  icon,
}: CardActionProps) => {
  return (
    <Tooltip title={title || 'Reference'} placement="left">
      <Button
        ghost
        size="small"
        type={type}
        shape="circle"
        icon={icon ? icon : <PlusOutlined />}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default CardAction;
