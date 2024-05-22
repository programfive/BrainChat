"use client";
import { Emoji, FullMessageType } from "@/types";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useScreen } from "usehooks-ts";
interface MessageEmojiProps {
  onHandleEmoji: (emojiObject: Emoji) => void;
}
export const MessageEmoji: React.FC<MessageEmojiProps> = ({
  onHandleEmoji,
}) => {
  const screen = useScreen();
  const perLine = screen?.width <= 420 ? 6 : 8;

  const categories = [
    "people",
    "activity",
    "flags",
    "foods",
    "frequent",
    "nature",
    "objects",
    "places",
    "symbols",
  ];

  return (
    
    <div>
      <Picker
        maxFrequentRows={0}
        perLine={perLine}
        native
        autoFocus
        data={data}
        theme="light"
        onEmojiSelect={onHandleEmoji}
        categories={categories}
        icons="solid"
        previewPosition="none"
        style={{ height: "300px" }}
      />
    </div>
  );
};
