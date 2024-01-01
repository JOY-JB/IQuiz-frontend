import { Metadata } from "next";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/components/ui/Home"), { ssr: false });

export const metadata: Metadata = {
  title: "IQuiz",
  description: "Quiz Management Application by Joy Barua",
};

export default function Home() {
  return <HomePage />;
}
