import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const viewSchema = z.object({
  userId: z.number(),
  chapterId: z.number(),
});

export async function GET(req: NextRequest) {
  try {
    const views = await prisma.views.findMany({
      include: {
        user: { select: { id: true, name: true } },
        chapter: { select: { id: true, title: true } },
        comic: { select: { id: true, title: true } },
      },
    });
    return NextResponse.json({ views }, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "badreq" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = viewSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req 1" }
    );
  }

  const { userId, chapterId } = checkValidation.data;

  try {
    // lấy comicId
    const chapter = await prisma.chapters.findUnique({
      where: { id: chapterId },
      include: { volume: { select: { comicId: true } } },
    });

    if (!chapter || !chapter.volume) {
      return NextResponse.json({ error: "Không có " }, { status: 404 });
    }
    //----------------
    const views = await prisma.views.upsert({
      where: { userId_comicId: { userId, comicId: chapter.volume.comicId } },
      update: { lastedAt: new Date(), chapterId },
      create: { userId, comicId: chapter.volume.comicId, chapterId },
      include: {
        chapter: {
          include: { volume: { include: { comic: { select: { id: true } } } } },
        },
      },
    });
    return NextResponse.json(views, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "BadReq2" });
  }
}
