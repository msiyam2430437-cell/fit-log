import { ArrowDown } from "lucide-react";
import Library from "@/components/Library";
export default function Home() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-4 pt-12 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <p className="text-accent font-bold tracking-[0.25em] text-sm">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display font-bold uppercase text-5xl lg:text-7xl leading-[1.05]">
            Train with intent. Log every set.
          </h1>
          <p className="text-neutral-300 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-accent text-black font-bold px-6 py-3 rounded-lg hover:brightness-110"
          >
            BROWSE WORKOUTS <ArrowDown size={18} />
          </a>
        </div>
        <div className="flex justify-center">
          <img
            src="/banner.png"
            alt="Training machine illustration"
            className="w-full max-w-sm md:max-w-md"
          />
        </div>
      </section>
      <Library />
    </>
  );
}
