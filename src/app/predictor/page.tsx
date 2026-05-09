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
  <section className="space-y-10">

    {/* Hero */}
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-16 text-white shadow-2xl">
      <div className="max-w-3xl">
        <p className="mb-3 inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
          🤖 AI-inspired Admission Predictor
        </p>

        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Predict Your College Opportunities
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-blue-100">
          Enter your exam and rank to instantly discover colleges
          where you are likely eligible based on cutoff trends.
        </p>
      </div>

      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
    </section>

    {/* Predictor Form */}
    <section className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-zinc-900">
          Smart Predictor Tool
        </h2>

        <p className="mt-3 text-zinc-600">
          Get personalized college predictions based on your rank.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Exam Name
          </label>

          <input
            value={exam}
            onChange={(event) => setExam(event.target.value)}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Exam (e.g., JEE)"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Your Rank
          </label>

          <input
            type="number"
            min={1}
            value={rank}
            onChange={(event) => setRank(event.target.value)}
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your rank"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Predicting Colleges..." : "Predict Colleges"}
        </button>
      </form>

      {error && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
    </section>

    {/* Results */}
    <section className="space-y-5">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900">
          Prediction Results
        </h2>

        {result.length > 0 && (
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            {result.length} colleges found
          </span>
        )}
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-zinc-600">
            Analyzing rank and predicting colleges...
          </p>
        </div>
      ) : result.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-zinc-600">
            No predictions yet. Enter your details above.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {result.map((college) => (
            <article
              key={college.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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

              <div className="mt-5 space-y-2">
                <p className="text-sm text-zinc-700">
                  💰 Fees:
                  <span className="ml-1 font-semibold">
                    ₹{college.fees.toLocaleString()} / year
                  </span>
                </p>

                <p className="text-sm text-zinc-700">
                  🎯 Eligible under{" "}
                  <span className="font-semibold text-blue-600">
                    {college.exam}
                  </span>
                </p>

                <p className="text-sm text-zinc-700">
                  📊 Cutoff Rank:
                  <span className="ml-1 font-semibold text-green-600">
                    {college.cutoffRank.toLocaleString()}
                  </span>
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  </section>
);

}
