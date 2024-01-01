"uce client";

import Loading from "@/app/loading";
import { useGetAllPerformersQuery } from "@/redux/api/userApi";
import { calculateSinglePerformerStats } from "@/utils";
import { Card, Layout, Progress, Typography } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const TopPerformerSection = () => {
  const { data, isLoading } = useGetAllPerformersQuery({});

  if (isLoading) {
    return <Loading />;
  }
  const performersData = data?.performers;
  const sortedPerformers = performersData?.slice().sort((a, b) => {
    const scoreA = calculateSinglePerformerStats(a)?.totalScore || 0;
    const scoreB = calculateSinglePerformerStats(b)?.totalScore || 0;
    return scoreB - scoreA;
  });

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10rem 0",
      }}
    >
      <Content style={{ maxWidth: "1480px" }}>
        <div style={{ textAlign: "center" }}>
          <Title>Our Top Performers</Title>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {sortedPerformers &&
            sortedPerformers.slice(0, 4).map((performer, index) => {
              const { totalAttempts, totalScore } =
                calculateSinglePerformerStats(performer);
              return (
                <Card
                  key={index}
                  style={{ width: 300, margin: "16px", position: "relative" }}
                >
                  <Card.Meta
                    title={performer.name}
                    description={<Paragraph>{performer.email}</Paragraph>}
                  />
                  <div
                    style={{
                      marginTop: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Score:</strong> {totalScore}
                      </div>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>Total Attempts:</strong> {totalAttempts}
                      </div>
                    </div>

                    <Progress
                      percent={
                        ((totalScore ? totalScore : 0) /
                          (totalAttempts ? totalAttempts : 0)) *
                        10
                      }
                      status="active"
                      showInfo={false}
                    />
                  </div>
                </Card>
              );
            })}
        </div>
      </Content>
    </Layout>
  );
};

export default TopPerformerSection;
