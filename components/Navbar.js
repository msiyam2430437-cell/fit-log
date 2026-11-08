import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="FitLog Logo" className="h-8 w-8" />
        <span className="font-bold">FITLOG</span>
      </div>
      <div className="flex gap-4">
        <Link href="/">Workouts</Link>
        <Link href="/my-plan">My Plan</Link>
      </div>
      <div className="flex gap-2"> 
            <Link href="/my-plan" className="border border-[#ccff00] rounded-full px-3 py-1 text-sm font-bold">Plan 0</Link>
            <Link href="/save-badges" className="border border-[#ccff00] rounded-full px-3 py-1 text-sm font-bold">Saved 0</Link>
      </div>
    </nav>
  );
}