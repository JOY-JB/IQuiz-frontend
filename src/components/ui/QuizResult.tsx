import { useSubmitAttemptMutation } from "@/redux/api/quizAttemptApi";
import { Card, Result, Typography } from "antd";
import { useEffect } from "react";

const { Text, Title, Paragraph } = Typography;

const QuizResult = ({
  totalQuestions,
  correctAnswers,
  categoryId,
}: {
  totalQuestions: number;
  correctAnswers: number;
  categoryId: string;
}) => {
  const percentage = (correctAnswers / totalQuestions) * 100;

  const [submitAttempt] = useSubmitAttemptMutation();

  useEffect(() => {
    const now = new Date();

    const formattedDate = now.toISOString();
    const data = {
      quizCategoryId: categoryId,
      score: correctAnswers,
      startedAt: formattedDate,
      completedAt: formattedDate,
    };

    const fetchData = async () => {
      try {
        const res = await submitAttempt({ ...data }).unwrap();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
