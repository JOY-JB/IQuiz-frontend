"use client";

import QuizTable from "@/components/table/QuizTable";
import { useGetAllQuestionsForAdminQuery } from "@/redux/api/questionsApi";
import { useDebounced } from "@/redux/hooks";
import { IQuestions, IQuizCategory } from "@/types";
import { useState } from "react";
import CardAction from "../CardAction";
import MainCard from "../MainCard";
import AddQuestion from "./AddQuestion";
import QuizzesAction from "./QuizzesAction";

const Quizzes = () => {
  const [open, setOpen] = useState<boolean>(false);

  // filtering and pagination
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllQuestionsForAdminQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allQuestions = data?.questions;
  const meta = data?.meta;

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const columns = [
    {
      title: "SN",
      render: (data: any, item: any, index: any) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Question",
      dataIndex: "text",
      sorter: true,
    },
    {
      title: "Options",
      dataIndex: "options",
      render: (el: string[]) => el.join(", "),
    },
    {
      title: "Correct Options",
      dataIndex: "correctOptions",
      render: (el: string[]) => el.join(", "),
    },
    {
      title: "Category",
      dataIndex: "quizzes",
      render: (el: IQuizCategory) => el.title,
    },
    {
      title: "Action",
      align: "center",
      render: (data: IQuestions) => <QuizzesAction data={data} />,
    },
  ];

  return (
    <MainCard
      title="Quizzes"
      extra={
        <CardAction title="Create Question" onClick={() => setOpen(true)} />
      }
    >
      {/* popup Items */}
      <AddQuestion open={open} handleClose={() => setOpen(false)} />
      {/* popup Items */}

      {/* filter area */}
      {/* <Row align="middle" justify="space-between" style={{ marginBottom: 20 }}>
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
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </Row> */}
      {/* end filter area */}

      {/* data table */}
      <QuizTable
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={allQuestions}
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

export default Quizzes;
