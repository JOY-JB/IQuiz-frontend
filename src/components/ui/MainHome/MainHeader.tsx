"use client";

import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../../../public/images/logo.png";
const { Header } = Layout;
const { Title } = Typography;

const MainHeader = () => {
  const [role, setRole] = useState();

  const logout = () => {
    removeUserInfo();
    setRole(undefined);
  };

  const items: MenuProps["items"] = [
    {
      label: <Link href={"/"}>Home</Link>,
      key: "home",
    },
    role === "ADMIN"
      ? {
          label: <Link href={"/dashboard"}>Dashboard</Link>,
          key: "dashboard",
        }
      : null,
    {
      label: <Link href={"/start-quiz"}>Start Quiz</Link>,
      key: "start-quiz",
    },
    {
      label: <Link href={"/leaderboard"}>Leaderboard</Link>,
      key: "leaderboard",
    },
  ];

  const avatarItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button type="text" danger onClick={logout}>
          Logout
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const { role } = getUserInfo() as any;

    setRole(role);
  }, []);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f1efff",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        padding: "0 15px",
      }}
    >
      <Image className="logo" src={logo} width={150} alt="logo" />
      <Menu
        theme="light"
        mode="horizontal"
        selectable={false}
        items={items}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
          fontSize: "16px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          minWidth: "10%",
        }}
      >
        {role ? (
          <>
            <Title
              className="MainHeaderTitle"
              level={5}
              style={{ margin: "auto 8px" }}
            >
              {role === "ADMIN" ? "Admin" : "User"}
            </Title>
            <Dropdown
              menu={{ items: avatarItems }}
              placement="bottomRight"
              arrow
            >
              <Space wrap size={16}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </Dropdown>
          </>
        ) : (
          <Link href={"/login"}>
            <Button type="primary">Login</Button>
          </Link>
        )}
      </div>
    </Header>
  );
};

export default MainHeader;
