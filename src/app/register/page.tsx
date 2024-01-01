import PerformerRegistrationPageComponent from "@/components/ui/Registration";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IQuiz | Registration",
  description: "Quiz Management Application by Joy Barua",
};

const RegistrationPage = () => {
  return <PerformerRegistrationPageComponent />;
};

export default RegistrationPage;
