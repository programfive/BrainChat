import { db } from "@/lib/db";
import { NextResponse } from "next/server";
interface Params {
  params: { id: string };
}
export async function GET(request: Request, { params }: Params) {
  try {
    const messageEmojis = await db.messageEmoji.findMany({
      where: {
        messageId: params.id,
      },
    });
    if (!messageEmojis)
      return NextResponse.json({ message: "Emoji not found" }, { status: 404 });

    return NextResponse.json(messageEmojis);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
