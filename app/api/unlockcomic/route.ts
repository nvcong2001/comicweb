import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const unlock_comic = await prisma.unlock_comic.findMany();
  return NextResponse.json(
    { data: unlock_comic },
    { status: 200, statusText: "OK" }
  );
}

const unlock_comicSchema = z.object({
  userId: z.number(),
  comicId: z.number(),
  transactionId: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = unlock_comicSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, comicId, transactionId } = checkValidation.data;

  try {
    const unlock_comic = await prisma.unlock_comic.create({
      data: {
        userId,
        comicId,
        transactionId,
      },
    });
    return NextResponse.json(unlock_comic, {
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
