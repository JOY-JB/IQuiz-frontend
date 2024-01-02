"use client";

import QuestionCard from "@/components/ui/QuestionCard";
import { useGetQuestionsByCategoryQuery } from "@/redux/api/questionsApi";

interface IProps {
  params: {
    id: string;
  };
}

const PlayingQuiz = ({ params }: IProps) => {
  const { id } = params;

  const { data, isLoading } = useGetQuestionsByCategoryQuery({
    categoryId: id,
    arg: {},
  });

  const questions = data?.questions || [];

  return (
    <div>
      <QuestionCard
        questions={questions}
        isLoading={isLoading}
        categoryId={id}
      />
    </div>
  );
};

export default PlayingQuiz;
