"use client";

import { FormEvent, useState } from "react";

type PredictedCollege = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  cutoffRank: number;
  exam: string;
};

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE");
  const [rank, setRank] = useState("");
  const [result, setResult] = useState<PredictedCollege[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/predictor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam, rank: Number(rank) }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Unable to run prediction");
        setResult([]);
        return;
      }

      setResult(data.data ?? []);
    } catch {
      setError("Unable to run prediction");
      setResult([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold">Simple Predictor Tool</h1>
      <p className="text-sm text-zinc-600">Enter your exam and rank to get likely college options.</p>

      <form onSubmit={onSubmit} className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:max-w-lg">
        <input
          value={exam}
          onChange={(event) => setExam(event.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2"
          placeholder="Exam (e.g., JEE)"
        />
        <input
          type="number"
          min={1}
          value={rank}
          onChange={(event) => setRank(event.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2"
          placeholder="Your rank"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Colleges"}
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-3 md:grid-cols-2">
        {result.map((college) => (
          <article key={college.id} className="rounded-lg border border-zinc-200 bg-white p-4">
            <h2 className="text-base font-semibold">{college.name}</h2>
            <p className="text-sm text-zinc-600">{college.location}</p>
            <p className="mt-1 text-sm">Fees: ₹{college.fees.toLocaleString()} / year</p>
            <p className="text-sm">Rating: {college.rating.toFixed(1)} / 5</p>
            <p className="text-sm">
              Eligible under {college.exam} up to rank {college.cutoffRank.toLocaleString()}
            </p>
          </article>
        ))}
      </div>

      {!loading && result.length === 0 && !error && <p className="text-sm text-zinc-600">No predictions yet.</p>}
    </section>
  );
}
