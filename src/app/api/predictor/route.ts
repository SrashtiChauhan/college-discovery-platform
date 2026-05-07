import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { exam?: string; rank?: number };
  const exam = body.exam?.trim();
  const rank = Number(body.rank);

  if (!exam || !Number.isFinite(rank) || rank <= 0) {
    return NextResponse.json({ error: "Valid exam and rank are required" }, { status: 400 });
  }

  const colleges = await prisma.college.findMany({
    where: {
      exam: { equals: exam, mode: "insensitive" },
      cutoffRank: { gte: rank },
    },
    orderBy: [{ cutoffRank: "asc" }, { rating: "desc" }],
    select: {
      id: true,
      name: true,
      location: true,
      fees: true,
      rating: true,
      cutoffRank: true,
      exam: true,
    },
  });

  return NextResponse.json({ data: colleges });
}
