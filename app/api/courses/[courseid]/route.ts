import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export const GET = async (
  req: Request,
  { params }: { params: { courseid: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, params.courseid),
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { courseid: number } }
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, params.courseid))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseIdParams = searchParams.get();

  const courseidNumber = Number(courseid);
  if (isNaN(courseidNumber)) {
    return new NextResponse("Invalid course ID", { status: 400 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, params.courseid))
    .returning();

  return NextResponse.json(data[0]);
};
