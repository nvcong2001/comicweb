import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const roles = await prisma.roles.findMany();
  return NextResponse.json({ roles }, { status: 200, statusText: "OK" });
}

const roleSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(255),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkValidation = roleSchema.safeParse(body);

  if (!checkValidation.success) {
    return NextResponse.json(
      { error: checkValidation.error.issues },
      { status: 400, statusText: "Bad Request" }
    );
  }

  const { title, description } = checkValidation.data;

  try {
    const roles = await prisma.roles.create({
      data: { title, description },
    });
    return NextResponse.json(roles, { status: 201, statusText: "Created" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400, statusText: "Bad Req" });
  }
}
