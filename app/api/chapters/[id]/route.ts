import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const chapterSchema = z.object({
  title: z.string().min(1).max(50),
  filePath: z.string().min(1).max(100),
  content: z.string().min(1).max(500),
  price: z.number().positive(),
  lock: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const chapters = await prisma.chapters.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(chapters, {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, filePath, content, price, lock } = await request.json();
  const validateCheck = chapterSchema.safeParse({
    title,
    filePath,
    content,
    price,
    lock,
  });
  if (!validateCheck.success) {
    return NextResponse.json(validateCheck.error.message, { status: 400 });
  }

  try {
    const updateChapter = await prisma.chapters.update({
      where: { id: Number(id) },
      data: { title, filePath, content, price, lock, updatedAt: new Date() },
    });

    return NextResponse.json(updateChapter, {
      status: 200,
      statusText: "success",
    });
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
    const deleteChapters = await prisma.chapters.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(deleteChapters, {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
