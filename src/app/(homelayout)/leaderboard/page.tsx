"use client";
import QuizTable from "@/components/table/QuizTable";
import { useGetAllPerformersQuery } from "@/redux/api/userApi";
import { calculatePerformerStats } from "@/utils";
import { Typography } from "antd";

const { Title } = Typography;

const LeaderboardPage = () => {
  const { data, isLoading } = useGetAllPerformersQuery({});

  const performersData = data?.performers || [];

  const newPerformersData = calculatePerformerStats(performersData);

  const sortedPerformers = newPerformersData?.sort(
    (a, b) => b.totalScore - a.totalScore
  );

  const columns = [
    {
      title: "Rank",
      dataIndex: "",
      key: "rank",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Attempts",
      dataIndex: "totalAttempts",
      key: "totalAttempts",
    },
    {
      title: "Total Score",
      dataIndex: "totalScore",
      key: "totalScore",
    },
  ];

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         height: "80vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Spin size="large">
  //         <div className="content" />
  //       </Spin>
  //     </div>
  //   );
  // }

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "2rem auto" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Leaderboard
      </Title>
      <QuizTable
        columns={columns}
        dataSource={sortedPerformers || []}
        rowKey="id"
        loading={isLoading}
        pageSize={20}
        showPagination={false}
        showSizeChanger={false}
      />
    </div>
  );
};

export default LeaderboardPage;
