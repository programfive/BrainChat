"use client";
import { useConversation } from "@/hooks/use-conversation";
import { EmptyState } from "@/components/empty-state";
import { cn } from "@/lib/utils";
export default function ConversationPage() {
  const { isOpen } = useConversation();
  return (
    <div
      className={cn("flex-1 hidden h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
