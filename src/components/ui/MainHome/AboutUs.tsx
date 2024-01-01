import { Col, Layout, Row, Typography } from "antd";
import Image from "next/image";
import quizImage from "../../../../public/images/logo.png";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUsSection = () => {
  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10rem 0",
      }}
    >
      <Content
        style={{
          maxWidth: "1400px",
        }}
      >
        <Row gutter={[24, 24]} justify="center" align="middle">
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
            }}
          >
            <Image
              src={quizImage}
              alt="Quiz Image"
              width={500}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ padding: "0 10px" }}>
              <Title level={1}>About Our Quiz Platform</Title>
              <Paragraph style={{ fontSize: "1rem" }}>
                Welcome to our interactive quiz platform! We are dedicated to
                providing a seamless and engaging experience for quiz creators
                and knowledge enthusiasts alike.
              </Paragraph>
              <Paragraph style={{ fontSize: "1rem" }}>
                Our mission is to make learning fun and accessible. With a
                diverse range of quiz categories and user-friendly features, we
                aim to foster a love for knowledge and continuous learning.
              </Paragraph>
              <Paragraph style={{ fontSize: "1rem" }}>
                Whether you&apos;re an admin crafting quizzes or a performer
                eager to test your skills, our platform is designed to meet your
                needs. Join us in the journey of exploration and discovery
                through quizzes.
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AboutUsSection;
