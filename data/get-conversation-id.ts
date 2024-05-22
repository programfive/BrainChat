import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function getConversationId(conversationId: string) {
  try {
    const user = await currentUser();
    if (!user?.email) {
      return null;
    }
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error: any) {
    console.log(error, "SERVER_ERROR");
    return null;
  }
}
