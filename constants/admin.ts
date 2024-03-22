import { IconType } from "react-icons";
import { FaHome, FaQuestion, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { ImWarning } from "react-icons/im";

interface adminPanelRouteType {
  route: string;
  name: string;
  Icon: IconType;
}

export const adminPanelRoutes: adminPanelRouteType[] = [
  {
    route: "/admin/users",
    name: "Users",
    Icon: FaUser,
  },
  {
    route: "/admin/questions",
    name: "Questions",
    Icon: FaQuestion,
  },
  {
    route: "/admin/feeds",
    name: "Feeds",
    Icon: FaMessage,
  },
  {
    route: "/admin/reports",
    name: "Reports",
    Icon: ImWarning,
  },
];
