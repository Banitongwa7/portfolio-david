const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "04/2026 - Now" -> "Apr 2026 – now"
export function formatRange(range: string) {
  return range
    .split("-")
    .map((part) => {
      const value = part.trim();
      const match = value.match(/^(\d{1,2})\/(\d{4})$/);
      if (!match) return value.toLowerCase();
      return `${MONTHS[Number(match[1]) - 1]} ${match[2]}`;
    })
    .join(" – ");
}

// "Internship - Microsoft Power Platform Consultant" -> "Microsoft Power Platform Consultant, internship"
// "React JS Developer - Freelance" -> "React JS Developer, freelance"
export function formatRole(position: string) {
  const [first, second] = position.split(" - ").map((s) => s.trim());
  if (!second) return position;
  if (/^internship$/i.test(first)) return `${second}, internship`;
  return `${first}, ${second.toLowerCase()}`;
}

// "2025-12-07T…" -> "7 Dec 2025"
export function formatShortDate(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

// "2025-12-07T…" -> "7 December 2025"
export function formatLongDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
