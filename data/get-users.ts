import { auth } from "@/auth";
import { db } from "@/lib/db";
export async function getUsers() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    throw new Error("User session not found or missing email");
  }
  try {
    const users = await db.user.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; 
  }
}
