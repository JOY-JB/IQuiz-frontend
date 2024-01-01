"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { useGetAllQuizCategoryQuery } from "@/redux/api/quizCategoryApi";
import { IQuizCategory } from "@/types";
import { Col, Row } from "antd";

const StartQuiz = () => {
  const { data, isLoading } = useGetAllQuizCategoryQuery({});

  const categories = data?.quizCategories;

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
          <Col key={category.id} span={8}>
            <CategoryCard {...category} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StartQuiz;
