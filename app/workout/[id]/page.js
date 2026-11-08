"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Bookmark } from "lucide-react";
import { getOne } from "@/lib/api";
import { usePlan, CAP } from "@/context/PlanContext";
export default function Details() {
  const { id } = useParams();
  const { plan, addPlan, addSaved } = usePlan();
  const [w, setW] = useState(null);
  const [state, setState] = useState("loading");
  useEffect(() => {
    getOne(id)
      .then((d) => {
        if (d && d.id) {
          setW(d);
          setState("ok");
        } else setState("missing");
      })
      .catch(() => setState("missing"));
  }, [id]);
  if (state === "loading")
    return (
      <div className="flex justify-center py-32">
        <div className="w-12 h-12 border-4 border-line border-t-accent rounded-full animate-spin" />
      </div>
    );
  if(state==="missing")notFound();
  const full = plan.length >= CAP && !plan.some((p) => p.id === w.id);
  const specs = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating],
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <img
        src={w.image}
        alt={w.name}
        className="w-full rounded-xl object-cover md:sticky md:top-24 self-start"
      />
      <div className="space-y-6">
        <h1 className="font-display font-bold uppercase text-4xl lg:text-5xl">
          {w.name}
        </h1>
        <p className="text-neutral-300">{w.description}</p>
        <div className="flex gap-2 flex-wrap">
          {w.muscleGroups.map((m) => (
            <span
              key={m}
              className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-accent/15 text-accent"
            >
              {m}
            </span>
          ))}
        </div>
        <div className="bg-card border border-line rounded-xl divide-y divide-line">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-3 text-sm">
              <span className="text-neutral-400 uppercase tracking-wide">
                {k}
              </span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-display text-2xl uppercase mb-3">Instructions</h2>
          <ol className="space-y-3">
            {w.instructions.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-accent text-black font-bold grid place-items-center text-sm">
                  {i + 1}
                </span>
                <span className="text-neutral-300">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => addPlan(w)}
            disabled={full}
            className="flex items-center justify-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            Add to today&apos;s plan
          </button>
          <button
            onClick={() => addSaved(w)}
            className="flex items-center justify-center gap-2 border border-accent text-accent font-bold px-6 py-3 rounded-lg hover:bg-accent/10"
          >
            <Bookmark size={18} />
            Save for later
          </button>
        </div>
        {full && (
          <p className="text-sm text-neutral-400">
            Today&apos;s plan is full (5 lifts).
          </p>
        )}
      </div>
    </div>
  );
}
