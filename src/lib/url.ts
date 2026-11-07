/** Префикс внутренних ссылок с учётом base (для GitHub Pages проектного сайта). */
export function u(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}
