import { IconType } from "react-icons";
import { FaHome, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

interface adminPanelRouteType {
  route: string;
  name: string;
  Icon: IconType;
}

export const adminPanelRoutes: adminPanelRouteType[] = [
  {
    route: "/admin/",
    name: "Home",
    Icon: FaHome,
  },
  {
    route: "/admin/users",
    name: "Users",
    Icon: FaUser,
  },
  {
    route: "/admin/posts",
    name: "Posts",
    Icon: FaMessage,
  },
];
