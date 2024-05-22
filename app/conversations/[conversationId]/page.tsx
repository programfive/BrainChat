import { EmptyState } from "@/components/empty-state";
import { getConversationId } from "@/data/get-conversation-id";
import { getMessages } from "@/data/get-messages";
import { Header } from "./components/header";
import { Body } from "./components/body";
import { Form } from "./components/form";

interface IParams {
  conversationId: string;
}
export default async function ConversationId({ params }: { params: IParams }) {
  const conversation = await getConversationId(params.conversationId);
  const message = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className="h-full flex-1">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 fixed z-50 bg-white dark:bg-background border-r border-border md:static inset-0 h-full">
      <div className="h-full relative flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={message} />
        <Form />
      </div>
    </div>
  );
}
