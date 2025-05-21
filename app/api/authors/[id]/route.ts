import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const authorSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500),
  keywords: z.string().min(1).max(40),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const authors = await prisma.authors.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(authors, { status: 200, statusText: "success" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, description, keywords } = await request.json();
  const validateCheck = authorSchema.safeParse({ name, description, keywords });
  if (!validateCheck.success) {
    return NextResponse.json(validateCheck.error.message, { status: 400 });
  }

  try {
    const updateAuthor = await prisma.authors.update({
      where: { id: Number(id) },
      data: { name, description, keywords },
    });
    return NextResponse.json(updateAuthor, { status: 200 });
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
    const deleteAuthor = await prisma.authors.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deleteAuthor, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
