import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  const { slug } = (await params) || [];
  const authors = await prisma.authors.findMany();
  // Nếu không có slug
  if (!slug || slug.length === 0) {
    return NextResponse.json(
      {
        data: {
          messege: `Get all`,
          data: authors,
        },
      },
      { status: 200, statusText: "OK" }
    );
  } else {
    // Nếu có slug
    return NextResponse.json(
      {
        data: {
          messege: `Get slug ${slug.join("/")}`,
          data: authors,
        },
      },
      { status: 200, statusText: "OK" }
    );
  }
}
