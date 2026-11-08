"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import { getAll } from "@/lib/api";
export default function Library() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [sort, setSort] = useState("duration");
  const [q, setQ] = useState("");
  useEffect(() => {
    getAll()
      .then(setItems)
      .catch(() => setErr(true))
      .finally(() => setLoading(false));
  }, []);
  const list = items
    .filter((w) =>
      (w.name + " " + w.muscleGroups.join(" "))
        .toLowerCase()
        .includes(q.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "duration"
        ? a.duration - b.duration
        : sort === "calories"
          ? b.caloriesBurned - a.caloriesBurned
          : b.rating - a.rating,
    );
  return (
    <section id="library" className="max-w-6xl mx-auto px-4 pt-16 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-4xl uppercase">The Library</h2>
          <p className="text-neutral-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-3 text-neutral-500"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name or tag"
              className="bg-card border border-line rounded-lg pl-9 pr-3 py-2 text-sm w-full sm:w-52"
            />
          </div>
          <label className="relative flex items-center text-sm">
            <span className="mr-2 text-neutral-400">Sort By</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-card border border-line rounded-lg pl-3 pr-8 py-2"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 pointer-events-none"
            />
          </label>
        </div>
      </div>
      {loading && (
        <div className="flex flex-col items-center py-20 gap-3">
          <div className="w-12 h-12 border-4 border-line border-t-accent rounded-full animate-spin" />
          <p className="text-neutral-400">Loading workouts…</p>
        </div>
      )}
      {err && (
        <p className="text-center text-red-400 py-16">
          Could not load workouts. Please refresh.
        </p>
      )}
      {!loading && !err && list.length === 0 && (
        <p className="text-center text-neutral-400 py-16">
          No workouts match your search.
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w) => (
          <WorkoutCard key={w.id} w={w} />
        ))}
      </div>
    </section>
  );
}
