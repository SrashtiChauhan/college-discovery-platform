"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CollegeCard = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPct: number;
};

type CollegesResponse = {
  data: CollegeCard[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [course, setCourse] = useState("");
  const [page, setPage] = useState(1);
  const [locations, setLocations] = useState<string[]>([]);
  const [result, setResult] = useState<CollegesResponse | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const query = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: "6" });
    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (maxFees) params.set("maxFees", maxFees);
    if (course) params.set("course", course);
    return params.toString();
  }, [search, location, maxFees, course, page]);

  useEffect(() => {
    void fetch("/api/colleges/options")
      .then((res) => res.json())
      .then((data: { locations: string[] }) => setLocations(data.locations ?? []));
  }, []);

  useEffect(() => {
    void fetch(`/api/colleges?${query}`)
      .then((res) => res.json())
      .then((data: CollegesResponse) => setResult(data))
      .finally(() => setIsFetching(false));
  }, [query]);

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold">College Listing + Search</h1>

      <div className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-4">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
            setIsFetching(true);
          }}
          placeholder="Search by college name"
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
        <select
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
            setPage(1);
            setIsFetching(true);
          }}
          className="rounded-md border border-zinc-300 px-3 py-2"
        >
          <option value="">All locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          value={maxFees}
          onChange={(event) => {
            setMaxFees(event.target.value);
            setPage(1);
            setIsFetching(true);
          }}
          placeholder="Max annual fees"
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
        <input
          value={course}
          onChange={(event) => {
            setCourse(event.target.value);
            setPage(1);
            setIsFetching(true);
          }}
          placeholder="Filter by course"
          className="rounded-md border border-zinc-300 px-3 py-2"
        />
      </div>

      {!result ? (
        <p className="text-sm text-zinc-600">Loading colleges...</p>
      ) : (
        <>
          {isFetching && <p className="text-sm text-zinc-600">Updating results...</p>}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(result?.data ?? []).map((college) => (
              <article key={college.id} className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold">{college.name}</h2>
                <p className="mt-1 text-sm text-zinc-600">{college.location}</p>
                <p className="mt-2 text-sm">Fees: ₹{college.fees.toLocaleString()} / year</p>
                <p className="text-sm">Rating: {college.rating.toFixed(1)} / 5</p>
                <p className="text-sm">Placement: {college.placementPct}%</p>
                <Link href={`/colleges/${college.id}`} className="mt-3 inline-block text-sm font-medium text-blue-600">
                  View details →
                </Link>
              </article>
            ))}
          </div>

          {result?.data?.length === 0 && <p className="text-sm text-zinc-600">No colleges found.</p>}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 1));
                setIsFetching(true);
              }}
              disabled={page <= 1}
              className="rounded-md border border-zinc-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm text-zinc-700">
              Page {result?.pagination.page ?? 1} of {result?.pagination.totalPages ?? 1}
            </p>
            <button
              onClick={() => {
                setPage((prev) => prev + 1);
                setIsFetching(true);
              }}
              disabled={page >= (result?.pagination.totalPages ?? 1)}
              className="rounded-md border border-zinc-300 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
