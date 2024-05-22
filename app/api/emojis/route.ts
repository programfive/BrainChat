import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, messageId, content } = body;

    if (!userId || !messageId || !content) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const existingMessageEmoji = await db.messageEmoji.findUnique({
      where: {
        userId_messageId: {
          userId,
          messageId,
        }
      }
    });

    let response;

    if (existingMessageEmoji) {
      response = await db.messageEmoji.update({
        where: {
          id: existingMessageEmoji.id,
        },
        data: {
          content,
        }
      });
    } else {
      response = await db.messageEmoji.create({
        data: {
          content,
          messageId,
          userId,
        },
      });
    }

    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}