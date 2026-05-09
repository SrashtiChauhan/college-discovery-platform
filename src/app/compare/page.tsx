"use client";

import { useEffect, useMemo, useState } from "react";

type Option = { id: string; name: string };
type ComparedCollege = {
  id: string;
  name: string;
  fees: number;
  placementPct: number;
  rating: number;
  location: string;
};

export default function ComparePage() {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<string[]>(["", "", ""]);
  const [result, setResult] = useState<ComparedCollege[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void fetch("/api/colleges/options")
      .then((res) => res.json())
      .then((data: { colleges: Option[] }) => setOptions(data.colleges ?? []));
  }, []);

  const activeIds = useMemo(() => Array.from(new Set(selected.filter(Boolean))).slice(0, 3), [selected]);

  useEffect(() => {
    if (activeIds.length < 2) {
      return;
    }
    void fetch(`/api/compare?ids=${activeIds.join(",")}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Unable to compare colleges");
          setResult([]);
          return;
        }
        setResult(data.data ?? []);
      })
      .catch(() => {
        setError("Unable to compare colleges");
        setResult([]);
      });
  }, [activeIds]);

return (
  <section className="space-y-10">

    {/* Hero Section */}
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-8 py-16 text-white shadow-2xl">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
          ⚖️ Smart College Comparison
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Compare Colleges Side by Side
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-blue-100">
          Analyze fees, placements, ratings, and locations to make
          smarter admission decisions.
        </p>
      </div>

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
    </section>

    {/* Selectors */}
    <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-zinc-900">
          Select Colleges
        </h2>

        <p className="mt-2 text-zinc-600">
          Choose 2 to 3 colleges for detailed comparison.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {selected.map((value, idx) => (
          <div key={idx} className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              College {idx + 1}
            </label>

            <select
              value={value}
              onChange={(event) => {
                const next = [...selected];
                next[idx] = event.target.value;
                setSelected(next);
              }}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select college</option>

              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </section>

    {/* Error */}
    {error && (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    )}

    {/* Comparison Results */}
    {result.length > 0 && (
      <section className="space-y-6">

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-zinc-900">
            Comparison Results
          </h2>

          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            {result.length} colleges selected
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-lg lg:block">
          <table className="min-w-full text-left">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  College
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Annual Fees
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Placement %
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Rating
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-zinc-700">
                  Location
                </th>
              </tr>
            </thead>

            <tbody>
              {result.map((college) => (
                <tr
                  key={college.id}
                  className="border-t border-zinc-200 transition hover:bg-zinc-50"
                >
                  <td className="px-6 py-5 font-semibold text-zinc-900">
                    {college.name}
                  </td>

                  <td className="px-6 py-5 text-zinc-700">
                    ₹{college.fees.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {college.placementPct}%
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      ⭐ {college.rating.toFixed(1)}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-zinc-700">
                    📍 {college.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-5 lg:hidden">
          {result.map((college) => (
            <article
              key={college.id}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-zinc-900">
                  {college.name}
                </h3>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  ⭐ {college.rating.toFixed(1)}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-600">
                📍 {college.location}
              </p>

              <div className="mt-5 space-y-3">
                <p className="text-sm text-zinc-700">
                  💰 Fees:
                  <span className="ml-1 font-semibold">
                    ₹{college.fees.toLocaleString()}
                  </span>
                </p>

                <p className="text-sm text-zinc-700">
                  💼 Placements:
                  <span className="ml-1 font-semibold text-green-600">
                    {college.placementPct}%
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    )}

    {/* Empty State */}
    {result.length === 0 && (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-zinc-600">
          Select at least 2 colleges to start comparing.
        </p>
      </div>
    )}
  </section>
);

}
