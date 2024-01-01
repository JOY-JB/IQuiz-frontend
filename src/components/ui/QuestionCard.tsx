"use client";

import { IQuestions } from "@/types";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

const QuizComponent = ({ questions }: { questions: IQuestions[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState<string[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      setShuffledOptions(
        shuffleOptions(questions[currentQuestionIndex].options)
      );
    }
  }, [questions, currentQuestionIndex]);

  const shuffleOptions = (options: string[]) => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j],
        shuffledOptions[i],
      ];
    }
    return shuffledOptions;
  };

  const handleOptionChange = (option: string) => {
    setChosenAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const indexOfOption = updatedAnswers.indexOf(option);

      if (indexOfOption !== -1) {
        updatedAnswers.splice(indexOfOption, 1);
      } else {
        updatedAnswers.push(option);
      }

      return updatedAnswers;
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = areArraysEqual(
      currentQuestion.correctOptions,
      chosenAnswers
    );

    if (isCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const areArraysEqual = (arr1: string[], arr2: string[]) => {
    return (
      arr1.length === arr2.length && arr1.every((value) => arr2.includes(value))
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Quiz Completed!</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "5rem auto" }}>
      <Card
        title={<Title level={4}>{currentQuestion.text}</Title>}
        extra={<QuestionCircleOutlined style={{ fontSize: "20px" }} />}
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: `1px solid #673AB7`,
          borderRadius: "8px",
        }}
      >
        <Row gutter={[16, 16]}>
          {shuffledOptions.map((option: string, index: number) => (
            <Col key={index} span={12} style={{ maxWidth: "100%" }}>
              <div
                onClick={() => handleOptionChange(option)}
                style={{
                  backgroundColor: chosenAnswers.includes(option)
                    ? "#673AB7"
                    : "transparent",
                  padding: "16px",
                  border: "1px solid #673AB7",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: chosenAnswers.includes(option) ? "#fff" : "#000",
                }}
              >
                {option}
              </div>
            </Col>
          ))}
        </Row>
        <Button
          type="primary"
          onClick={handleNext}
          style={{
            width: "100%",
            marginTop: "16px",
            backgroundColor: "#ff9800",
          }}
          disabled={chosenAnswers.length === 0}
        >
          Next
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <p className="text-gray-600 text-xl">
            {currentQuestionIndex + 1}
            <span>/{questions.length}</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default QuizComponent;
