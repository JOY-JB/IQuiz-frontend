"use client";

import { Layout } from "antd";

import AboutUsSection from "./MainHome/AboutUs";
import AppFooter from "./MainHome/Footer";
import HeroSection from "./MainHome/HeroSection";
import MainHeader from "./MainHome/MainHeader";
import TopPerformerSection from "./MainHome/TopPerformerSection";

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <MainHeader />
      <Content>
        <HeroSection />
        <AboutUsSection />
        <TopPerformerSection />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default HomePage;
