"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = usePlan();
  const link = (href, label) => (
    <Link
      href={href}
      className={`px-3 py-1.5 text-sm font-semibold uppercase tracking-wide rounded ${path === href ? "bg-accent text-black" : "text-neutral-300 hover:text-white"}`}
    >
      {label}
    </Link>
  );
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-line">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl tracking-wide"
        >
          <img src="/logo.png" alt="FitLog logo" className="w-8 h-8 rounded" />
          <span className="hidden sm:inline">FITLOG</span>
        </Link>
        <div className="flex gap-1">
          {link("/", "Workout")}
          {link("/my-plan", "My Plan")}
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <Link
            href="/my-plan"
            className="px-3 py-1 rounded-full bg-accent text-black"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="px-3 py-1 rounded-full border border-accent text-accent"
          >
            Saved {saved.length}
          </Link>
        </div>
      </nav>
    </header>
  );
}
