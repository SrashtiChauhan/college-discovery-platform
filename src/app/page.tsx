import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Discover and decide your next college</h1>
      <p className="max-w-2xl text-zinc-700">
        Explore colleges, compare options side-by-side, and use the rank predictor to shortlist better.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/colleges" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Browse Colleges
        </Link>
        <Link href="/compare" className="rounded-md border border-zinc-300 bg-white px-4 py-2 hover:bg-zinc-100">
          Compare Colleges
        </Link>
      </div>
    </section>
  );
}
