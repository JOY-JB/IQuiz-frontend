import { IQuizCategory } from "@/types";
import { PlayCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Link from "next/link";

const CategoryCard = ({ title, description, questions, id }: IQuizCategory) => {
  const numberOfQuestions = questions ? questions.length : 0;
  const isButtonDisabled = numberOfQuestions < 1;

  return (
    <Card
      hoverable
      style={{
        width: 300,
        height: 250,
        borderRadius: 12,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: "bold", margin: 0 }}>{title}</h3>
      </div>
      <p
        style={{ color: "rgba(0, 0, 0, 0.8)", marginBottom: 24, marginTop: 24 }}
      >
        {description}
      </p>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f5",
        }}
      >
        <span>
          {
            <QuestionCircleOutlined
              style={{ fontSize: "20px", marginRight: "5px" }}
            />
          }
          <span style={{ display: "inline-block", fontSize: "20px" }}>
            {numberOfQuestions > 10 ? 10 : numberOfQuestions}
          </span>
        </span>
        <Link href={isButtonDisabled ? "#" : `/start-quiz/${id}`}>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            style={{ borderRadius: 8 }}
            disabled={isButtonDisabled}
          >
            Start
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CategoryCard;
