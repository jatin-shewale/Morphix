export const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export function buildApiUrl(path) {
  if (!path) return API_BASE || "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE}${path}`;
}
