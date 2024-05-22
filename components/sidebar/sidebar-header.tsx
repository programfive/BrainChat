import { GroupChatModal } from "@/app/conversations/components/group-chat-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "next-auth";
import React, { useState } from "react";
import { FaUsers, FaUser, FaThList } from "react-icons/fa";
import { SettingModal } from "./setting-modal";
import { HiEllipsisVertical, HiMiniCog8Tooth } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { TooltipHeader } from "../tooltip-header";
import { DesktopLinks } from "./desktop-links";
import { Button } from "@/components/ui/button";
interface SidebarHeaderProps {
  users: User[];
}
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ users }) => {
  const currentUser = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const buttonClass = "p-1 border-none";
  return (
    <div className=" hidden  py-4 gap-2 px-2 items-center justify-end lg:flex">
      <TooltipHeader text="Setting">
        <SettingModal
          isOpen={isSettingModal}
          onClose={() => setIsSettingModal(!isSettingModal)}
          currentUser={currentUser!}
        >
          <Button variant="outline" asChild size="icon" className={buttonClass}>
            <HiOutlineCog6Tooth />
          </Button>
        </SettingModal>
      </TooltipHeader>

      <TooltipHeader text="New group">
        <GroupChatModal
          data={users}
          isOpen={isModalOpen}
          onToggleModal={() => setIsModalOpen(!isModalOpen)}
        >
          <Button variant="outline" asChild size="icon" className={buttonClass}>
            <HiOutlineUserGroup />
          </Button>
        </GroupChatModal>
      </TooltipHeader>
      <DesktopLinks>
        <HiEllipsisVertical />
      </DesktopLinks>
    </div>
  );
};
