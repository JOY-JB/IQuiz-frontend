'use client';

import { useState } from 'react';
import { Button, Input, Row } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useGetAllQuizCategoryQuery } from '@/redux/api/quizCategoryApi';
import { useDebounced } from '@/redux/hooks';
import MainCard from '../MainCard';
import CardAction from '../CardAction';
import QuizTable from '@/components/table/QuizTable';
import { IQuizCategory } from '@/types';
import AddCategory from './AddCategory';
import CategoriesAction from './CategoriesAction';

const Categories = () => {
  const [open, setOpen] = useState<boolean>(false);

  // filtering and pagination
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllQuizCategoryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allQuizCategories = data?.quizCategories || [];
  const meta = data?.meta;

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  // end filtering and pagination

  const columns = [
    {
      title: 'SN',
      render: (data: any, item: any, index: any) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      align: 'center',
      render: (data: IQuizCategory) => <CategoriesAction data={data} />,
    },
  ];

  return (
    <MainCard
      title="Quiz Categories"
      extra={
        <CardAction title="Create Category" onClick={() => setOpen(true)} />
      }
    >
      {/* popup Items */}
      <AddCategory open={open} handleClose={() => setOpen(false)} />
      {/* popup Items */}

      {/* filter area */}
      <Row align="middle" justify="space-between" style={{ marginBottom: 20 }}>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: 250,
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: '0px 5px' }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </Row>
      {/* end filter area */}

      {/* data table */}
      <QuizTable
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={allQuizCategories}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </MainCard>
  );
};

export default Categories;
