import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const cateSchema = z.object({
  title: z.string().min(1).max(50),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const categories = await prisma.categories.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(categories, {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title } = await request.json();
  const validateCheck = cateSchema.safeParse({ title });
  if (!validateCheck.success) {
    return NextResponse.json(validateCheck.error.message, { status: 400 });
  }

  try {
    const updateCategorie = await prisma.categories.update({
      where: { id: Number(id) },
      data: { title: title },
    });
    return NextResponse.json(updateCategorie, {
      status: 200,
      statusText: "success",
    });
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
    const deleteCategory = await prisma.categories.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(deleteCategory, {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
