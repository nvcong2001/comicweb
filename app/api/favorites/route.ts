import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const favoriteSchema = z.object({
  userId: z.number(),
  comicId: z.number(),
});

export async function GET(req: NextRequest) {
  try {
    const favorites = await prisma.favorites.findMany({
      include: {
        user: { select: { id: true, name: true } },
        comic: { select: { id: true, title: true } },
      },
    });
    return NextResponse.json({ favorites }, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "bad req" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = favoriteSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, comicId } = checkValidation.data;

  try {
    const favorites = await prisma.favorites.create({
      data: { userId, comicId },
    });
    return NextResponse.json(favorites, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const checkValidation = favoriteSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400 }
    );
  }

  const { userId, comicId } = checkValidation.data;

  try {
    const deleteFavorite = await prisma.favorites.delete({
      where: { userId_comicId: { userId, comicId } },
    });
    return NextResponse.json({ deleteFavorite }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
