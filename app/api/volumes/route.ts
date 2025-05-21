import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const volumes = await prisma.volumes.findMany();
  return NextResponse.json({ data: volumes }, { status: 200 });
}

const volumeSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  price: z.number().positive(),
  comicId: z.number().int(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = volumeSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { title, description, price, comicId } = checkValidation.data;

  try {
    const volumes = await prisma.volumes.create({
      data: { title, description, price, comicId },
    });
    return NextResponse.json(volumes, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

export async function DELETE(params: NextRequest) {
  try {
    const deleteVolumes = await prisma.volumes.deleteMany();
    return NextResponse.json(deleteVolumes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad req" });
  }
}
