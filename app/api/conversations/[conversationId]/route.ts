import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [user.id],
        },
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    return NextResponse.json(null);
  }
}
