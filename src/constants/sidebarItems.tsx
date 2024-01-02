import {
  DashboardOutlined,
  FileProtectOutlined,
  HomeOutlined,
  ProfileOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (data: string) => {
  const role = data === "ADMIN" ? "admin" : "performer";

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/dashboard`}>Dashboard</Link>,
      key: "dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link href={`/${role}/quizzes`}>Quizzes</Link>,
      key: "quizzes",
      icon: <TableOutlined />,
    },
    {
      label: <Link href={`/${role}/categories`}>Categories</Link>,
      key: "categories",
      icon: <TableOutlined />,
    },
    {
      label: <Link href={`/${role}/performers`}>Performers List</Link>,
      key: "performers-list",
      icon: <UserOutlined />,
    },
    {
      label: <Link href={`/${role}/admins`}>Admins List</Link>,
      key: "admins-list",
      icon: <UserOutlined />,
    },
  ];

  const performerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: <Link href={`/${role}/start-quiz`}>Start Quiz</Link>,
      key: "start-quiz",
      icon: <UnorderedListOutlined />,
    },
    {
      label: <Link href={`/${role}/my-performance`}>My Performance</Link>,
      key: "my-performance",
      icon: <FileProtectOutlined />,
    },
    {
      label: <Link href={`/leaderboard`}>Leaderboard</Link>,
      key: "leaderboard",
      icon: <ProfileOutlined />,
    },
  ];

  if (data === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (data === USER_ROLE.PERFORMER) return performerSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
