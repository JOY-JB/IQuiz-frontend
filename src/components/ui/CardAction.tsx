import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ButtonType } from "antd/es/button";

type CardActionProps = {
  title?: string;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLElement>;
  tooltipColor?: string;
  icon?: React.ReactNode;
};

const CardAction = ({
  title,
  type = "primary",
  onClick,
  icon,
}: CardActionProps) => {
  return (
    // <Tooltip title={title || "Reference"} placement="left">
    <Button
      ghost
      size="middle"
      type={type}
      shape="round"
      icon={icon ? icon : <PlusOutlined />}
      onClick={onClick}
    >
      {title}
    </Button>
    // </Tooltip>
  );
};

export default CardAction;
