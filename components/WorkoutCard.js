import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
export const Stats = ({ w }) => (
  <div className="flex gap-4 text-sm text-neutral-300">
    <span className="flex items-center gap-1">
      <Clock size={14} className="text-accent" />
      {w.duration} min
    </span>
    <span className="flex items-center gap-1">
      <Flame size={14} className="text-accent" />
      {w.caloriesBurned} kcal
    </span>
    <span className="flex items-center gap-1">
      <Star size={14} className="text-accent" />
      {w.rating}
    </span>
  </div>
);
export default function WorkoutCard({ w }) {
  return (
    <Link
      href={`/workout/${w.id}`}
      className="block bg-card border border-line rounded-xl overflow-hidden hover:border-accent transition"
    >
      <img
        src={w.image}
        alt={w.name}
        className="w-full aspect-[4/3] object-cover"
      />
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {w.muscleGroups.map((m) => (
            <span
              key={m}
              className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-accent/15 text-accent"
            >
              {m}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl uppercase">{w.name}</h3>
        <p className="text-sm text-neutral-400">{w.equipment}</p>
        <Stats w={w} />
      </div>
    </Link>
  );
}
