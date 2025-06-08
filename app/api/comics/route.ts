import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams;
  const limit: number = Number(url.get("limit")) || 10;
  const page: number = Number(url.get("page")) || 1;
  const totalRecords: number = await prisma.comics.count();
  const totalPages = Math.ceil(totalRecords / limit);
  const comics = await prisma.comics.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  return NextResponse.json(
    { data: comics, extraInfo: { totalPages } },
    { status: 200, statusText: "OK" }
  );
}

const comicSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  image: z.string().min(1).max(100),
  keywords: z.string().min(1).max(100),
  status: z.string().min(1).max(100),
  price: z.number().positive(),
  userId: z.number(),
  categoryIds: z.array(z.number()).min(1),
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
  const {
    title,
    description,
    image,
    keywords,
    status,
    price,
    userId,
    categoryIds,
  } = checkValidation.data;

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
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(comics, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
