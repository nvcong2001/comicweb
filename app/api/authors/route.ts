import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const authors = await prisma.authors.findMany();
  return NextResponse.json({ authors }, { status: 200, statusText: "OK" });
}

const authorSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500),
  keywords: z.string().min(1).max(40),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = authorSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { name, description, keywords } = checkValidation.data;

  try {
    const authors = await prisma.authors.create({
      data: { name, description, keywords },
    });
    return NextResponse.json({ authors }, { status: 200, statusText: "OK" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

// export async function PUT(req: NextRequest) {
//   const body = await req.json();
//   const checkValidation = authorSchema.safeParse(body);

//   if (!checkValidation.success) {
//     return NextResponse.json(
//       { error: checkValidation.error.errors },
//       { status: 401, statusText: "bad req" }
//     );
//   }
//   const { name, description, keywords } = checkValidation.data;

//   try {
//     const updateAuhors = await prisma.authors.updateMany({
//       data: { name, description, keywords },
//     });
//     return NextResponse.json(updateAuhors, {
//       status: 200,
//       statusText: "ok",
//     });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 400, statusText: "Bad req" });
//   }
// }

// export async function DELETE(params: NextRequest) {
//   try {
//     const deleteAuthors = await prisma.authors.deleteMany();
//     return NextResponse.json(deleteAuthors, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 400, statusText: "Bad req" });
//   }
// }
