"use client";

import { Layout } from "antd";

import AboutUsSection from "./MainHome/AboutUs";
import CategorySection from "./MainHome/CategoriesSection";
import AppFooter from "./MainHome/Footer";
import HeroSection from "./MainHome/HeroSection";
import MainHeader from "./MainHome/MainHeader";

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <MainHeader />
      <Content>
        <HeroSection />
        <AboutUsSection />
        <CategorySection />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default HomePage;
