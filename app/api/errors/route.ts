import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const errorSchema = z.object({
  userId: z.number(),
  chapterId: z.number(),
  content: z.string().min(1).max(255),
  status: z.string().min(1).max(255),
});

export async function GET(req: NextRequest) {
  try {
    const errors = await prisma.errors.findMany({
      include: {
        user: { select: { name: true } },
        chapter: { select: { id: true, title: true, volumeId: true } },
      },
    });
    return NextResponse.json({ errors }, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad req" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = errorSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, chapterId, content, status } = checkValidation.data;

  try {
    const errors = await prisma.errors.create({
      data: { userId, chapterId, content, status },
    });
    return NextResponse.json(errors, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const checkValidation = errorSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, chapterId, content, status } = checkValidation.data;

  try {
    const errors = await prisma.errors.update({
      where: { userId_chapterId: { userId, chapterId } },
      data: { status, chapterId },
    });

    return NextResponse.json(errors, { status: 201, statusText: "Updated" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
