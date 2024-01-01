import AdminList from "@/components/ui/AdminsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz | Quizzes",
};

const AdminsPage = () => {
  return <AdminList />;
};

export default AdminsPage;
