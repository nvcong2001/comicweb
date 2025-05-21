import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const transactions = await prisma.transactions.findMany();
  return NextResponse.json(
    { data: transactions },
    { status: 200, statusText: "OK" }
  );
}

const transactionSchema = z.object({
  id: z.number(),
  walletId: z.number(),
  amount: z.number(),
  description: z.string().min(1).max(255),
  status: z.string().min(1).max(255),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = transactionSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { id, walletId, amount, description, status } = checkValidation.data;

  try {
    const transactions = await prisma.transactions.create({
      data: {
        id,
        walletId,
        amount,
        description,
        status,
      },
    });
    return NextResponse.json(transactions, {
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
