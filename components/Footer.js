export default function Footer() {
  return (
    <footer className="border-t border-line bg-black mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-neutral-400">
        <div className="flex items-center gap-2 font-display text-lg text-white">
          <img src="/logo.png" alt="" className="w-7 h-7 rounded" />
          FITLOG
        </div>
        <p className="text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
