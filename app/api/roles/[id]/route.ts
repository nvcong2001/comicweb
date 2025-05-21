import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const roleSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(255),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const roles = await prisma.roles.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, description } = await request.json();
  const validateCheck = roleSchema.safeParse({ title, description });
  if (!validateCheck.success) {
    return NextResponse.json(validateCheck.error.message, { status: 400 });
  }

  try {
    const updateRole = await prisma.chapters.update({
      where: { id: Number(id) },
      data: { title: title },
    });
    return NextResponse.json(updateRole, { status: 200 });
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
    const deleteRole = await prisma.roles.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deleteRole, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
