import { NextRequest, NextResponse } from "next/server";
import { UserCreate } from "@/models/user";
import * as bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  const body: UserCreate = await req.json();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email.toLowerCase(),
      password: await bcrypt.hashSync(body.password, 10),
    },
  });

  const { password, ...userWithOutPassword } = user;
  return NextResponse.json(userWithOutPassword);
}
