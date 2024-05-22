import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedNote = await db.message.delete({
      where: {
        id: params.id,
      },
    });
    if (!deletedNote)
      return NextResponse.json({ message: "Note not found" }, { status: 404 });

    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the record" },
      { status: 500 }
    );
  }
}
