import {
  HomeOutlined,
  ProfileOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (data: string) => {
  const role = data === "ADMIN" ? "admin" : "performer";

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={"/dashboard"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Quizzes",
      key: "quizzes",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/quizzes`}>Quiz List</Link>,
          key: `/${role}/quizzes`,
        },
        {
          label: <Link href={`/${role}/quizzes/create`}>Create Quiz</Link>,
          key: `/${role}/quizzes/create`,
        },
      ],
    },
    {
      label: "Categories",
      key: "categories",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/categories`}>Category List</Link>,
          key: `/${role}/categories`,
        },
        {
          label: (
            <Link href={`/${role}/categories/create`}>Create Categories</Link>
          ),
          key: `/${role}/categories/create`,
        },
      ],
    },
    {
      label: <Link href={`${role}/create`}>Create Admin</Link>,
      key: "create-admin",
      icon: <UserAddOutlined />,
    },
    {
      label: <Link href={`/leaderboard`}>Leaderboard</Link>,
      key: "leaderboard",
      icon: <ProfileOutlined />,
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
