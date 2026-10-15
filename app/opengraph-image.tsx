import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_ROLE, SITE_URL } from "@/utils/site";

export const alt = `${SITE_NAME} — ${SITE_ROLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f172a",
          padding: 80,
          color: "#f8fafc",
        }}
      >
        <div style={{ display: "flex", width: 120, height: 8, background: "#10b981" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, fontWeight: 700, letterSpacing: -2 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 40, color: "#94a3b8", marginTop: 16 }}>
            {SITE_ROLE}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#64748b" }}>
          {SITE_URL.replace("https://", "")}
        </div>
      </div>
    ),
    size
  );
}
