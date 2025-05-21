import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  userId: z.number(),
  comicId: z.number(),
});

export async function GET(req: NextRequest) {
  const posts = await prisma.posts.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      comic: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return NextResponse.json({ data: posts }, { status: 200, statusText: "OK" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = postSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, comicId } = checkValidation.data;

  try {
    const posts = await prisma.posts.create({
      data: {
        userId,
        comicId,
      },
    });
    return NextResponse.json(posts, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
