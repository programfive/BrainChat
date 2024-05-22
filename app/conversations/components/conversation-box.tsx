import React from "react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import { UserAvatar } from "@/components/user-avatar";
import { useSession } from "next-auth/react";
import { GroupAvatar } from "@/components/group-avatar";
import { cn } from "@/lib/utils";

interface ConversationBoxProps {
  data: FullConversationType;
  selected: boolean;
}
export const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const router = useRouter();
  const otherUser = useOtherUser(data);
  const session = useSession();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.file) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full relative  flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-background dark:hover:opacity-50  transition cursor-pointer p-4 border-b border-b-border",
        selected ? "dark:opacity-70 bg-gray-100 dark:bg-background" : "dark:bg-background "
      )}
    >
      {data.isGroup ? (
        <GroupAvatar data={data.users} />
      ) : (
        <UserAvatar data={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-neutral-800 dark:text-white">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-sm text-foreground dark:text-muted-foreground font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={
              "text-sm text-foreground dark:text-muted-foreground font-light"
            }
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};
