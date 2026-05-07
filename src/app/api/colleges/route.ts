import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(Number(searchParams.get("page") ?? "1"), 1);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? "6"), 1), 20);
  const search = searchParams.get("search")?.trim();
  const location = searchParams.get("location")?.trim();
  const maxFees = Number(searchParams.get("maxFees") ?? "0");
  const course = searchParams.get("course")?.trim();

  const where = {
    ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {}),
    ...(location ? { location: { equals: location, mode: "insensitive" as const } } : {}),
    ...(Number.isFinite(maxFees) && maxFees > 0 ? { fees: { lte: maxFees } } : {}),
    ...(course
      ? {
          courses: {
            some: {
              name: { contains: course, mode: "insensitive" as const },
            },
          },
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.college.findMany({
      where,
      orderBy: [{ rating: "desc" }, { name: "asc" }],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        location: true,
        fees: true,
        rating: true,
        placementPct: true,
      },
    }),
    prisma.college.count({ where }),
  ]);

  return NextResponse.json({
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(Math.ceil(total / limit), 1),
    },
  });
}
