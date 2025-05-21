import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const comics = await prisma.comics.findMany({});
  return NextResponse.json({ comics }, { status: 200, statusText: "OK" });
}

const comicSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  image: z.string().min(1).max(100),
  keywords: z.string().min(1).max(100),
  status: z.string().min(1).max(100),
  price: z.number().positive(),
  userId: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = comicSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { title, description, image, keywords, status, price, userId } =
    checkValidation.data;

  try {
    const comics = await prisma.comics.create({
      data: {
        title,
        description,
        image,
        keywords,
        status,
        price,
        user: { connect: { id: userId } },
      },
    });
    return NextResponse.json(comics, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
