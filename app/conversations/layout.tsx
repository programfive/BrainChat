import React, { useState } from "react";
import getConversations from "@/data/get-conversations";
import { getUsers } from "@/data/get-users";
import { ConversationList } from "./components/conversation-list";
import { LayoutTemplate } from "@/components/layout-template";
interface ConversationLayoutProps {
  children: React.ReactNode;
}
export default async function ConversationLayout({
  children,
}: ConversationLayoutProps) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <LayoutTemplate
      SidebarComponent={ConversationList}
      sidebarProps={{ users, initialItems: conversations }}
    >
      {children}
    </LayoutTemplate>
  );
}
