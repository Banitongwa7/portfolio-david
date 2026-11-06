import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared look of the share images (app/opengraph-image.tsx and the blog's),
// matching the site: night background, neon gradient, Archivo and an
// Instrument Serif accent. The fonts live in assets/fonts (OFL licensed).

export const OG_SIZE = { width: 1200, height: 630 };

export const OG = {
  night: "#0F0A1E",
  white: "#FFFFFF",
  soft: "rgba(255, 255, 255, 0.72)",
  muted: "rgba(255, 255, 255, 0.5)",
  neon: "linear-gradient(90deg, #FF8A3D 0%, #E8479B 50%, #9B7BFF 100%)",
  glows:
    "radial-gradient(circle at 88% 8%, rgba(123, 92, 250, 0.55) 0%, rgba(123, 92, 250, 0) 42%), radial-gradient(circle at 8% 100%, rgba(232, 71, 155, 0.42) 0%, rgba(232, 71, 155, 0) 40%)",
};

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

export async function loadOgFonts() {
  const [bold, medium, serif] = await Promise.all([
    font("archivo-800.woff"),
    font("archivo-500.woff"),
    font("instrument-serif-italic.woff"),
  ]);
  return [
    { name: "Archivo", data: bold, weight: 800 as const, style: "normal" as const },
    { name: "Archivo", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}

// The "David." mark from the navigation.
export function OgLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", fontFamily: "Archivo", fontWeight: 800, fontSize: 40, color: OG.white }}>
      David
      <div
        style={{
          width: 13,
          height: 13,
          marginLeft: 5,
          marginTop: 14,
          borderRadius: 13,
          backgroundImage: OG.neon,
        }}
      />
    </div>
  );
}
