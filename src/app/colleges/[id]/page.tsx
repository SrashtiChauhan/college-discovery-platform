"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Course = { id: string; name: string; duration: string; annualFee: number };
type Review = { id: string; author: string; rating: number; comment: string };

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPct: number;
  overview: string;
  basicInfo: string;
  coursesOffered: string;
  courses: Course[];
  reviews: Review[];
};

export default function CollegeDetailPage() {
  const params = useParams<{ id: string }>();
  const [college, setCollege] = useState<College | null | undefined>(undefined);

  useEffect(() => {
    if (!params.id) return;
    void fetch(`/api/colleges/${params.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: College | null) => setCollege(data));
  }, [params.id]);

  if (college === undefined) return <p className="text-sm text-zinc-600">Loading college details...</p>;
  if (!college) return <p className="text-sm text-red-600">College not found.</p>;

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-5">
        <h1 className="text-2xl font-bold">{college.name}</h1>
        <p className="mt-1 text-zinc-600">{college.location}</p>
        <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
          <p>Fees: ₹{college.fees.toLocaleString()} / year</p>
          <p>Rating: {college.rating.toFixed(1)} / 5</p>
          <p>Placements: {college.placementPct}%</p>
          <p>Courses Offered: {college.coursesOffered}</p>
        </div>
        <p className="mt-4 text-sm text-zinc-700">{college.overview}</p>
        <p className="mt-2 text-sm text-zinc-700">{college.basicInfo}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="text-lg font-semibold">Courses</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {college.courses.map((course) => (
              <li key={course.id} className="rounded border border-zinc-200 p-2">
                <p className="font-medium">{course.name}</p>
                <p className="text-zinc-600">{course.duration}</p>
                <p>Annual fee: ₹{course.annualFee.toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {college.reviews.map((review) => (
              <li key={review.id} className="rounded border border-zinc-200 p-2">
                <p className="font-medium">{review.author}</p>
                <p className="text-zinc-600">Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
