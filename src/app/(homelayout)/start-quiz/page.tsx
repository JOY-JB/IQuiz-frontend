"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { useGetAllQuizCategoryQuery } from "@/redux/api/quizCategoryApi";
import { isLoggedIn } from "@/services/auth.service";
import { IQuizCategory } from "@/types";
import { Col, Row, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StartQuiz = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, isLoading: dataIsLoading } = useGetAllQuizCategoryQuery({});

  const categories = data?.quizCategories;

  const router = useRouter();
  const userLoggedIn = isLoggedIn();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
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

  if (dataIsLoading) {
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
