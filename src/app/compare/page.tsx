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
    <section className="space-y-5">
      <h1 className="text-2xl font-bold">Compare Colleges</h1>
      <p className="text-sm text-zinc-600">Pick 2 to 3 colleges to compare decision-critical attributes.</p>

      <div className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-3">
        {selected.map((value, idx) => (
          <select
            key={idx}
            value={value}
            onChange={(event) => {
              const next = [...selected];
              next[idx] = event.target.value;
              setSelected(next);
            }}
            className="rounded-md border border-zinc-300 px-3 py-2"
          >
            <option value="">Select college {idx + 1}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        ))}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-100">
              <tr>
                <th className="px-3 py-2 font-semibold">College</th>
                <th className="px-3 py-2 font-semibold">Fees (₹/year)</th>
                <th className="px-3 py-2 font-semibold">Placement %</th>
                <th className="px-3 py-2 font-semibold">Rating</th>
                <th className="px-3 py-2 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {result.map((college) => (
                <tr key={college.id} className="border-t border-zinc-200">
                  <td className="px-3 py-2">{college.name}</td>
                  <td className="px-3 py-2">{college.fees.toLocaleString()}</td>
                  <td className="px-3 py-2">{college.placementPct}%</td>
                  <td className="px-3 py-2">{college.rating.toFixed(1)}</td>
                  <td className="px-3 py-2">{college.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
