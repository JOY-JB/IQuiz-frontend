import Quizzes from '@/components/ui/Quizzes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz | Quizzes',
};

const QuizzesPage = () => {
  return <Quizzes />;
};

export default QuizzesPage;
