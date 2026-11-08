const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];
async function get(s = "") {
  for (const b of BASES) {
    try {
      const r = await fetch(b + s);
      if (r.ok) return await r.json();
    } catch {}
  }
  throw new Error("API request failed");
}
export const getAll = () => get();
export const getOne = (id) => get("/" + id);
