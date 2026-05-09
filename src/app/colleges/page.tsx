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
  <section className="space-y-8">

    {/* Hero Section */}
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-8 py-16 text-white shadow-2xl">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
          🎓 Smart College Discovery Platform
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Find Your Dream College
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-blue-100 md:text-xl">
          Compare colleges, explore placements, analyze courses,
          and predict admissions with a modern data-driven platform.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#colleges-section"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:scale-105 hover:bg-blue-50"
          >
            Explore Colleges
          </a>

          <Link
            href="/predictor"
            className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Try Predictor
          </Link>
        </div>
      </div>

      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
    </section>

    {/* Filters Section */}
    <section
      id="colleges-section"
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-zinc-900">
          Explore Colleges
        </h2>

        <p className="mt-2 text-sm text-zinc-600">
          Search and filter colleges based on location, fees, and courses.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
            setIsFetching(true);
          }}
          placeholder="Search by college name"
          className="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <select
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
            setPage(1);
            setIsFetching(true);
          }}
          className="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
          className="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <input
          value={course}
          onChange={(event) => {
            setCourse(event.target.value);
            setPage(1);
            setIsFetching(true);
          }}
          placeholder="Filter by course"
          className="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>
    </section>

    {!result ? (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <div className="h-6 w-3/4 rounded bg-zinc-200"></div>

        <div className="mt-4 h-4 w-1/3 rounded bg-zinc-200"></div>

        <div className="mt-6 space-y-3">
          <div className="h-4 rounded bg-zinc-200"></div>
          <div className="h-4 rounded bg-zinc-200"></div>
          <div className="h-4 w-2/3 rounded bg-zinc-200"></div>
        </div>
      </div>
    ))}
  </div>
) : (
      <>
        {isFetching && (
          <p className="text-sm font-medium text-blue-600">
            Updating results...
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(result?.data ?? []).map((college) => (
            <article
              key={college.id}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-zinc-900">
                  {college.name}
                </h2>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  ⭐ {college.rating.toFixed(1)}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-600">
                📍 {college.location}
              </p>

              <div className="mt-5 space-y-2">
                <p className="text-sm text-zinc-700">
                  💰 Fees:
                  <span className="ml-1 font-semibold">
                    ₹{college.fees.toLocaleString()} / year
                  </span>
                </p>

                <p className="text-sm text-zinc-700">
                  💼 Placement:
                  <span className="ml-1 font-semibold text-green-600">
                    {college.placementPct}%
                  </span>
                </p>
              </div>

              <Link
                href={`/colleges/${college.id}`}
                className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                View Details →
              </Link>
            </article>
          ))}
        </div>

        {result?.data?.length === 0 && (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-zinc-600">
              No colleges found.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <button
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
              setIsFetching(true);
            }}
            disabled={page <= 1}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <p className="text-sm font-medium text-zinc-700">
            Page {result?.pagination.page ?? 1} of{" "}
            {result?.pagination.totalPages ?? 1}
          </p>

          <button
            onClick={() => {
              setPage((prev) => prev + 1);
              setIsFetching(true);
            }}
            disabled={page >= (result?.pagination.totalPages ?? 1)}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </>
    )}
  </section>
);

}
