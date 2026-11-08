"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
const Ctx = createContext(null);
export const usePlan = () => useContext(Ctx);
export const CAP = 5;
export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("fitlog") || "{}");
      setPlan(d.plan || []);
      setSaved(d.saved || []);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("fitlog", JSON.stringify({ plan, saved }));
  }, [plan, saved, ready]);
  const notify = useCallback((m) => {
    setToast(m);
    clearTimeout(window.__ft);
    window.__ft = setTimeout(() => setToast(null), 2200);
  }, []);
  const addPlan = (w) => {
    if (plan.some((p) => p.id === w.id))
      return notify("Already in today's plan");
    if (plan.length >= CAP) return notify("Plan is full — max 5 lifts");
    setPlan([...plan, { ...w, done: false }]);
    notify(`${w.name} added to today's plan`);
  };
  const addSaved = (w) => {
    if (saved.some((p) => p.id === w.id)) return notify("Already saved");
    setSaved([...saved, w]);
    notify(`${w.name} saved for later`);
  };
  const removePlan = (w) => {
    setPlan(plan.filter((p) => p.id !== w.id));
    notify(`${w.name} removed from plan`);
  };
  const removeSaved = (w) => {
    setSaved(saved.filter((p) => p.id !== w.id));
    notify(`${w.name} removed from saved`);
  };
  const markDone = (w) => {
    setPlan(plan.map((p) => (p.id === w.id ? { ...p, done: true } : p)));
    notify(`${w.name} marked as done`);
  };
  return (
    <Ctx.Provider
      value={{
        plan,
        saved,
        ready,
        addPlan,
        addSaved,
        removePlan,
        removeSaved,
        markDone,
        notify,
      }}
    >
      {children}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-accent text-black font-semibold px-5 py-3 rounded-lg shadow-lg max-w-[90vw] text-center"
        >
          {toast}
        </div>
      )}
    </Ctx.Provider>
  );
}
