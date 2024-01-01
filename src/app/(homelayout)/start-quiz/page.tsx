"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { useGetAllQuizCategoryQuery } from "@/redux/api/quizCategoryApi";
import { IQuizCategory } from "@/types";
import { Col, Row, Spin } from "antd";

const StartQuiz = () => {
  const { data, isLoading } = useGetAllQuizCategoryQuery({});

  const categories = data?.quizCategories;

  if (isLoading) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        marginTop: "3rem",
      }}
    >
      <Row gutter={16}>
        {categories?.map((category: IQuizCategory) => (
          <Col key={category.id} span={6}>
            <CategoryCard {...category} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StartQuiz;
