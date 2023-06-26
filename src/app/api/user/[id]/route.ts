import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const accessToken = req.headers.get("authorization");

  if (!accessToken || !verifyJwt(accessToken)) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const decodedToken = verifyJwt(accessToken);
  if (!decodedToken || !decodedToken.id) {
    return NextResponse.json("Invalid token or missing user identifier", {
      status: 401,
    });
  }

  const userId = decodedToken.id;

  if (userId !== params.id) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  const post = await prisma.post.findMany({
    where: {
      authorId: params.id,
    },
  });

  return NextResponse.json(post);
}
