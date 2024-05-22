import { Conversation, Message } from "@prisma/client";
import { User } from "next-auth";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
export interface Emoji {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: Array<string>;
  shortcodes: string;
}
declare module "next-auth" {
  interface User {
    createdAt: Date;
  }
}
