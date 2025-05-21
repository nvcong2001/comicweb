import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const comments = await prisma.comments.findMany({
      include: {
        user: { select: { id: true, name: true } },
        comic: { select: { id: true, title: true } },
        chapter: { select: { id: true, title: true } },
      },
    });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    const deleteComment = await prisma.comments.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deleteComment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
