import { Card, Result, Typography } from "antd";

const { Text, Title, Paragraph } = Typography;

const QuizResult = ({
  totalQuestions,
  correctAnswers,
}: {
  totalQuestions: number;
  correctAnswers: number;
}) => {
  const percentage = (correctAnswers / totalQuestions) * 100;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
      }}
    >
      <Card
        style={{
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #673AB7",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Result status="success" title="Quiz Completed!" />
        <Paragraph>
          <Text strong style={{ fontSize: "16px" }}>
            Total Questions:
          </Text>{" "}
          {totalQuestions}
        </Paragraph>
        <Paragraph>
          <Text strong style={{ fontSize: "16px" }}>
            Correct Answers:
          </Text>{" "}
          {correctAnswers}
        </Paragraph>
        <Paragraph>
          <Text strong style={{ fontSize: "16px" }}>
            Wrong Answers:
          </Text>{" "}
          {totalQuestions - correctAnswers}
        </Paragraph>
        <Paragraph>
          <Text strong style={{ fontSize: "16px" }}>
            Total Score:
          </Text>{" "}
          {correctAnswers}
        </Paragraph>
        <Paragraph>
          <Text strong style={{ fontSize: "16px" }}>
            Overall Percentage:
          </Text>{" "}
          {percentage.toFixed(2)}%
        </Paragraph>
      </Card>
    </div>
  );
};

export default QuizResult;
