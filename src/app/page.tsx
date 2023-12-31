import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "IQuiz",
  description: "Quiz Management Application by Joy Barua",
};

export default function Home() {
  return redirect("/login");
}
