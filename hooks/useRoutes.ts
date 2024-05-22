
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import {  HiMiniCog8Tooth} from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";
import { useConversation } from "./use-conversation";
import { useGroupStore } from "@/store/group";

const useRoutes = () => {
  const pathname = usePathname();
  const {toggleOpen}=useGroupStore()
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Users",
        href: "/users",
        icon: FaThList,
        active: pathname === "/users",
      },
      {
        label: "Setting",
        href: "#",
        onClick: () => {},
        icon: HiMiniCog8Tooth,
      },
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Group",
        href: "#",
        onClick: toggleOpen,
        icon: FaUserGroup,
      },
    ],
    [pathname, conversationId,toggleOpen]
  );

  return routes;
};

export default useRoutes;
