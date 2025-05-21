import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const chapters = await prisma.chapters.findMany();
  return NextResponse.json(
    { data: chapters },
    { status: 200, statusText: "OK" }
  );
}

const chapterSchema = z.object({
  title: z.string().min(1).max(50),
  filePath: z.string().min(1).max(100),
  content: z.string().min(1).max(500),
  price: z.number().positive(),
  lock: z.boolean().optional(),
  volumeId: z.number().int(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = chapterSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { title, filePath, content, price, lock, volumeId } =
    checkValidation.data;

  try {
    const chapters = await prisma.chapters.create({
      data: {
        title,
        filePath,
        content,
        price,
        lock: lock ?? false,
        volumeId, // volumeId được truyền vào
      },
    });

    return NextResponse.json(chapters, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

export async function DELETE(params: NextRequest) {
  try {
    const deleteChapters = await prisma.chapters.deleteMany();
    return NextResponse.json(deleteChapters, {
      status: 200,
      statusText: "ok",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad req" });
  }
}
