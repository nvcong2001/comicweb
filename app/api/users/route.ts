import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const users = await prisma.users.findMany();
  return NextResponse.json({ users }, { status: 200, statusText: "OK" });
}

const userSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  isDisabled: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = userSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { name, email, password, description, isDisabled } =
    checkValidation.data;

  try {
    const users = await prisma.users.create({
      data: {
        name,
        email,
        password,
        description,
        isDisabled: isDisabled ?? false,
      },
    });
    return NextResponse.json(users, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
