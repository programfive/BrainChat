"use client";
import React, { useEffect, useRef, useState } from "react";
import { FullMessageType } from "@/types";

import { MessageBox } from "./message-box";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConversation } from "@/hooks/use-conversation";
import { useMessageStore } from "@/store/messages";
import ImageGallery from "./ImageGallery";
interface BodyProps {
  initialMessages: FullMessageType[];
}

export const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const { messages, setMessages, addMessage, updateMessage } =
    useMessageStore();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageSelectedIndex, setImageSelectedIndex] = useState(0);
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, setMessages]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      if (!find(messages, { id: message.id })) {
        addMessage(message);
      }
      bottomRef.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      updateMessage(newMessage);
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId, addMessage, updateMessage, messages]);
  const image = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const filterImages = messages
    .filter((items) => image.includes(items.typeFile!) && items.file)
    .map((res) => res.file)
    .filter((url): url is string => url !== null);

  return (
    <>
      {isGalleryOpen && (
        <div className="flex justify-center w-screen items-center fixed inset-0 z-40 ">
          <div
            onClick={() => setIsGalleryOpen(false)}
            className="w-full h-full bg-black/60 absolute"
          />
          <ImageGallery
            images={filterImages}
            imageSelectedIndex={imageSelectedIndex}
          />
        </div>
      )}
      <ScrollArea className="flex-1  lg:px-6">
        {messages.map((message, i) => (
          <>
            <MessageBox
              onOpenImage={() => {
                filterImages.forEach((items, index) => {
                  items === message.file ? setImageSelectedIndex(index) : null;
                });
                setIsGalleryOpen(true);
              }}
              isLast={i === messages.length - 1}
              data={message}
            />
          </>
        ))}
        <div ref={bottomRef} className="pt-24" />
      </ScrollArea>
    </>
  );
};
