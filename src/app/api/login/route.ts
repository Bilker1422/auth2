import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";

interface LoginBody {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: LoginBody = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username.toLowerCase(),
    },
    select: {
      id: true,
      name: true,
      password: true,
    },
  });
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithOutPassword } = user;
    const accessToken = signJwtAccessToken(userWithOutPassword);
    const result = {
      ...userWithOutPassword,
      accessToken,
    };
    return NextResponse.json(result);
  }
  return NextResponse.json(null);
}
