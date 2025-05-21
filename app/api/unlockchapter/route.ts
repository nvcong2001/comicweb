import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const unlock_chapter = await prisma.unlock_chapter.findMany();
  return NextResponse.json(
    { data: unlock_chapter },
    { status: 200, statusText: "OK" }
  );
}

const unlock_chapterSchema = z.object({
  userId: z.number(),
  chapterId: z.number(),
  transactionId: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = unlock_chapterSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, chapterId, transactionId } = checkValidation.data;

  try {
    const unlock_chapter = await prisma.unlock_chapter.create({
      data: {
        userId,
        chapterId,
        transactionId,
      },
    });
    return NextResponse.json(unlock_chapter, {
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
