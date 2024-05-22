"use client";
import Link from "next/link";
import { BiMessageDetail, BiUser } from "react-icons/bi";
import { HiOutlineCog6Tooth, HiOutlineUserGroup } from "react-icons/hi2";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { User } from "next-auth";
import { SettingModal } from "./setting-modal";
import { GroupChatModal } from "@/app/conversations/components/group-chat-modal";
import { usePathname } from "next/navigation";

interface ActionsContentProps {
  items: User[];
}

export const MobileFooter: React.FC<ActionsContentProps> = ({ items }) => {
  const currentUser = useCurrentUser();
  const pathname = usePathname();
  const isConversationsOrUsersRoute = /\/(conversations|users)$/i.test(
    pathname || ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);

  const buttonClass =
    "flex  flex-col items-center gap-y-2 w-full justify-center p-4 cursor-pointer truncate hover:opacity-50";
  const buttonTextClass =
    "text-sm font-medium text-foreground dark:text-muted-foreground hidden ms:block";
  const buttonIconClass = "dark:text-white";

  if (!isConversationsOrUsersRoute) return null;

  return (
    <div className="fixed  bottom-0 z-40 flex w-screen items-center justify-between border-t-[.0625rem] bg-background lg:hidden">
      <Link href="/users" className={buttonClass}>
        <BiUser size={24} className={buttonIconClass} />
        <span className={buttonTextClass}>Users</span>
      </Link>
      <Link href="/conversations" className={buttonClass}>
        <BiMessageDetail size={24} className={buttonIconClass} />
        <span className={buttonTextClass}>Messages</span>
      </Link>
      <SettingModal
        isOpen={isSettingModal}
        onClose={() => setIsSettingModal(!isSettingModal)}
        currentUser={currentUser!}
      >
        <div className={buttonClass}>
          <HiOutlineCog6Tooth size={24} className={buttonIconClass} />
          <span className={buttonTextClass}>Settings</span>
        </div>
      </SettingModal>
      <GroupChatModal
        data={items}
        isOpen={isModalOpen}
        onToggleModal={() => setIsModalOpen(!isModalOpen)}
      >
        <div className={buttonClass}>
          <HiOutlineUserGroup size={24} className={buttonIconClass} />
          <span className={buttonTextClass}>Group</span>
        </div>
      </GroupChatModal>
    </div>
  );
};
