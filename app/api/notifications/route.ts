import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const notificationSchema = z.object({
  id: z.number(),
  userId: z.number(),
  content: z.string().min(2).max(255),
  isRead: z.boolean(),
});

export async function GET(req: NextRequest) {
  const notifications = await prisma.notifications.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      comment: { select: { id: true, content: true, createdAt: true } },
    },
  });
  return NextResponse.json({ notifications }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = notificationSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "BadReq1" }
    );
  }

  const { id, userId, content, isRead } = checkValidation.data;

  try {
    const notifications = await prisma.notifications.create({
      data: { id, userId, content, isRead },
    });
    return NextResponse.json({ notifications }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "BadReq2" });
  }
}
