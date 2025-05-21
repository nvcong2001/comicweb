import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const comicSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  image: z.string().min(1).max(100),
  keywords: z.string().min(1).max(100),
  status: z.string().min(1).max(100),
  price: z.number().positive(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const comics = await prisma.comics.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json(comics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, description, image, keywords, status, price } =
    await request.json();
  const validateCheck = comicSchema.safeParse({
    title,
    description,
    image,
    keywords,
    status,
    price,
  });

  if (!validateCheck.success) {
    return NextResponse.json(validateCheck.error.message, { status: 400 });
  }

  try {
    const updateComics = await prisma.comics.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        image,
        keywords,
        status,
        price,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(updateComics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleteComics = await prisma.comics.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deleteComics, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
