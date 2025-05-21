import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  isDisabled: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const users = await prisma.users.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, email, password, description, isDisabled } =
    await request.json();
  const validateCheck = userSchema.safeParse({
    name,
    email,
    password,
    description,
    isDisabled,
  });
  if (!validateCheck.success) {
    return NextResponse.json(validateCheck.error.message, { status: 400 });
  }

  try {
    const updateUser = await prisma.users.update({
      where: { id: Number(id) },
      data: { name, email, password, description, isDisabled },
    });
    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleteUser = await prisma.users.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
