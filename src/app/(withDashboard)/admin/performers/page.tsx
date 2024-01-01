import PerformersList from "@/components/ui/PerformersList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz | Quizzes",
};

const PerformersPage = () => {
  return <PerformersList />;
};

export default PerformersPage;
