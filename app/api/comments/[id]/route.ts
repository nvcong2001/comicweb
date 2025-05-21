import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(2).max(255),
  userId: z.number(),
  chapterId: z.number().optional(),
});

// API lấy theo [comicId]

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = await params;
  try {
    const comment = await prisma.comments.findMany({
      where: { comicId: Number(id) },
      include: {
        user: { select: { id: true, name: true } },
        chapter: { select: { id: true, title: true } },
      },
    });
    return NextResponse.json(comment, { status: 200, statusText: "success" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const { id } = await params;
  const body = await req.json();
  const checkValidation = commentSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "BadReq1" }
    );
  }

  const { content, userId } = checkValidation.data;

  try {
    const comment = await prisma.comments.create({
      data: {
        userId,
        comicId: Number(id),
        content,
        chapterId: Number(
          req.nextUrl.searchParams.get("chapterId") || undefined
        ),
      },
    });

    return NextResponse.json(comment, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "BadReq2" });
  }
}
