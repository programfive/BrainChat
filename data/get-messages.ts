import { db } from "@/lib/db";

export async function getMessages(conversationId: string) {
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error: any) {
    return [];
  }
}
