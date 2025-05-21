import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const wallets = await prisma.wallets.findMany();
  return NextResponse.json(
    { data: wallets },
    { status: 200, statusText: "OK" }
  );
}

const walletSchema = z.object({
  id: z.number(),
  userId: z.number(),
  value: z.number(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = walletSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { id, userId, value } = checkValidation.data;

  try {
    const wallets = await prisma.wallets.create({
      data: {
        id,
        userId,
        value,
      },
    });
    return NextResponse.json(wallets, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
