import LoginPageComponent from "@/components/ui/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IQuiz | login",
  description: "Quiz Management Application by Joy Barua",
};

const LoginPage = () => {
  return <LoginPageComponent />;
};

export default LoginPage;
