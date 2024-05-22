import { db } from "@/lib/db";
import { MessageEmoji } from "@prisma/client";

interface GetMessageEmojisProps {
  messageId: string;
}

export const getMessageEmojis = async ({ messageId }: GetMessageEmojisProps): Promise<MessageEmoji[]> => {
  try {
    const messageEmojis = await db.messageEmoji.findMany({
      where: {
        messageId,
      },
    });

    return messageEmojis;
  } catch (error: any) {
    return [];
  }
};