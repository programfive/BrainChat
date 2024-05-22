"use client";

import { UserAvatar } from "@/components/user-avatar";
import useOtherUser from "@/hooks/useOtherUser";
import { Conversation } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { ProfileDrawer } from "./profile-drawer";
import { GroupAvatar } from "@/components/group-avatar";
interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
export const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
  }, [conversation]);
  return (
    <div className="  w-full flex border-t border-r border-b  dark:bg-background sm:px-4 p-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block dark:text-white text-electric-violet-500 hover:text-electric-violet-600 transition cursor-pointer"
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        {conversation.isGroup ? (
          <GroupAvatar data={conversation.users} />
        ) : (
          <UserAvatar data={otherUser} />
        )}
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <ProfileDrawer data={conversation}>
        <HiEllipsisHorizontal
          size={32}
          className="text-electric-violet-500 cursor-pointer hover:text-sky-600 transition"
        />
      </ProfileDrawer>
    </div>
  );
};
