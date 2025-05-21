import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const volumeSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  price: z.number().positive(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const volumes = await prisma.volumes.findUnique({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(volumes, {
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
  const { title, description, price } = await request.json();
  const validateCheck = volumeSchema.safeParse({
    title,
    description,
    price,
  });
  if (!validateCheck.success) {
    return NextResponse.json(validateCheck.error.message, { status: 400 });
  }

  try {
    const updateVolume = await prisma.volumes.update({
      where: { id: Number(id) },
      data: { title, description, price, updatedAt: new Date() },
    });

    return NextResponse.json(updateVolume, {
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
    const deleteVolume = await prisma.volumes.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(deleteVolume, {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
