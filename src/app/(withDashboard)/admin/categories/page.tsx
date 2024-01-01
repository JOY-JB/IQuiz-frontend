import Categories from '@/components/ui/Categories';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz | Categories',
};

const CategoriesPage = () => {
  return <Categories />;
};

export default CategoriesPage;
