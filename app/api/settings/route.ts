import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";

import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const body = await request.json();
    const { name, image } = body;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        image: image,
        name: name,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
