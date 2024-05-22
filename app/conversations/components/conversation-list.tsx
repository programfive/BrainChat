"use client";
import { useConversation } from "@/hooks/use-conversation";
import { FullConversationType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ConversationBox } from "./conversation-box";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { find } from "lodash";
import { pusherClient } from "@/lib/pusher";
import { useCurrentUser } from "@/hooks/use-current-user";
import SidebarLayout from "@/components/sidebar/sidebar-layout";
interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}
export const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const user = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const session = useSession();
  const { conversationId, isOpen } = useConversation();
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const filteredItems = useMemo(() => {
    if (searchTerm.trim() === "") {
      return items;
    }

    return items.filter((item) => {
      if (item.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }

      const user = item.users.find((u) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return !!user;
    });
  }, [items, searchTerm]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
  }, [pusherKey, router]);
  return (
    <>
      <SidebarLayout
        items={users}
        searchTerm={searchTerm}
        filter={filteredItems}
        onSearch={(event) => setSearchTerm(event.currentTarget.value)}
        title="Messages"
        Content={({ items }) =>
          items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))
        }
      />
    </>
  );
};
