import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ids = (request.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (ids.length < 2) {
    return NextResponse.json({ error: "Select at least 2 colleges" }, { status: 400 });
  }

  const colleges = await prisma.college.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      fees: true,
      placementPct: true,
      rating: true,
      location: true,
    },
  });

  return NextResponse.json({ data: colleges });
}
