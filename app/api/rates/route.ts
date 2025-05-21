import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const rateSchema = z.object({
  userId: z.number(),
  comicId: z.number(),
  score: z.number(),
  content: z.string().min(1).max(255),
});

export async function GET(req: NextRequest) {
  try {
    const rates = await prisma.rates.findMany({
      include: {
        user: { select: { name: true } },
        comic: { select: { title: true } },
      },
    });
    return NextResponse.json({ rates }, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = rateSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, comicId, score, content } = checkValidation.data;

  try {
    const rates = await prisma.rates.create({
      data: { userId, comicId, score, content },
    });
    return NextResponse.json(rates, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const checkValidation = rateSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { userId, comicId, score, content } = checkValidation.data;

  try {
    const rates = await prisma.rates.update({
      where: { userId_comicId: { userId, comicId } },
      data: { score, content },
    });
    return NextResponse.json(rates, { status: 201, statusText: "updated" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

// export async function DELETE(req: NextRequest) {
//   const body = await req.json();
//   const checkValidation = rateSchema.safeParse(body);

//   if (!checkValidation.success) {
//     return NextResponse.json(
//       { error: checkValidation.error.errors },
//       { status: 400, statusText: "Bad Req" }
//     );
//   }

//   const { userId, comicId } = checkValidation.data;

//   try {
//     const deleteRate = await prisma.rates.delete({
//       where: {
//         userId_comicId: {
//           userId,
//           comicId,
//         },
//       },
//     });
//     return NextResponse.json({ deleteRate }, { status: 200, statusText: "Ok" });
//   } catch (error) {
//     return NextResponse.json(
//       { error: error },
//       { status: 400, statusText: "Bad req" }
//     );
//   }
// }
