import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const categories = await prisma.categories.findMany({});

  return NextResponse.json({ categories }, { status: 200, statusText: "OK" });
}

const cateSchema = z.object({
  title: z.string().min(1).max(50),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = cateSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.errors },
      { status: 400, statusText: "Bad Req" }
    );
  }

  const { title } = checkValidation.data;
  try {
    const categories = await prisma.categories.create({ data: { title } });
    return NextResponse.json(categories, {
      status: 201,
      statusText: "Created",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}

// export async function PUT(req: NextRequest) {
//   const body = await req.json();
//   const checkValidation = cateSchema.safeParse(body);

//   if (!checkValidation.success) {
//     return NextResponse.json(
//       { error: checkValidation.error.errors },
//       { status: 401, statusText: "bad req" }
//     );
//   }
//   const { title } = checkValidation.data;

//   try {
//     const updateCategories = await prisma.categories.updateMany({
//       data: { title },
//     });
//     return NextResponse.json(updateCategories, {
//       status: 200,
//       statusText: "ok",
//     });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 400, statusText: "Bad req" });
//   }
// }

export async function DELETE(params: NextRequest) {
  try {
    const deleteCategories = await prisma.categories.deleteMany();
    return NextResponse.json(deleteCategories, {
      status: 200,
      statusText: "ok",
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad req" });
  }
}
