import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const unlock_volume = await prisma.unlock_volume.findMany();
  return NextResponse.json(
    { data: unlock_volume },
    { status: 200, statusText: "OK" }
  );
}

const unlock_volumeSchema = z.object({
  userId: z.number(),
  volumeId: z.number(),
  transactionId: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = unlock_volumeSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, volumeId, transactionId } = checkValidation.data;

  try {
    const unlock_volume = await prisma.unlock_volume.create({
      data: {
        userId,
        volumeId,
        transactionId,
      },
    });
    return NextResponse.json(unlock_volume, {
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
