"use client";

import QuizTable from "@/components/table/QuizTable";
import { useGetAllAdminsQuery } from "@/redux/api/userApi";
import { useState } from "react";
import MainCard from "./MainCard";

const AdminList = () => {
  // filtering and pagination
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useGetAllAdminsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allAdmins = data?.admins;
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

  const columns = [
    {
      title: "SN",
      render: (data: any, item: any, index: any) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  return (
    <MainCard title="Admin list">
      <QuizTable
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={allAdmins}
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

export default AdminList;
