import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_ROLE, SITE_URL } from "@/utils/site";
import { OG, OG_SIZE, OgLogo, loadOgFonts } from "@/utils/og";

export const alt = `${SITE_NAME} — ${SITE_ROLE}`;
export const size = OG_SIZE;
export const contentType = "image/png";

// The share card of the home page: the hero, condensed.
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
          padding: "56px 72px",
          backgroundColor: OG.night,
          backgroundImage: OG.glows,
          color: OG.white,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <OgLogo />
          <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: OG.muted }}>
            {SITE_URL.replace("https://", "")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 52, color: OG.soft }}>
            I&apos;m David Banitongwa
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 6,
              fontSize: 132,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              backgroundImage: OG.neon,
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            SOFTWARE
          </div>
          <div style={{ display: "flex", fontSize: 132, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            ENGINEER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "100%", height: 2, backgroundImage: OG.neon }} />
          <div style={{ display: "flex", marginTop: 22, fontSize: 28, fontWeight: 500, color: OG.soft }}>
            Microsoft Power Platform developer · Kinshasa, DR Congo
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadOgFonts() }
  );
}
