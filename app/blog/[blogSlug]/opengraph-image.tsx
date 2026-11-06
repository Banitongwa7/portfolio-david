import { ImageResponse } from "next/og";
import { getPost } from "@/utils/hashnode";
import { OG, OG_SIZE, OgLogo, loadOgFonts } from "@/utils/og";

export const alt = "Blog post";
export const size = OG_SIZE;
export const contentType = "image/png";

const COVER_WIDTH = 440;

// The share card of an article: its title, and its cover when it has one.
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  // If the feed is down, the card still renders with a generic title.
  const post = await getPost((await params).blogSlug).catch(() => null);
  const title = post?.title ?? "Notes on tools, dev and AI";
  const titleSize = title.length > 80 ? 46 : title.length > 50 ? 54 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: OG.night,
          backgroundImage: OG.glows,
          color: OG.white,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
          }}
        >
          <OgLogo />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 40, color: OG.soft }}>
              From the blog
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                fontSize: titleSize,
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: -1.5,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 160, height: 6, borderRadius: 6, backgroundImage: OG.neon }} />
            <div style={{ display: "flex", marginTop: 18, fontSize: 26, fontWeight: 500, color: OG.soft }}>
              David Banitongwa{post ? ` · ${post.readTimeInMinutes} min read` : ""}
            </div>
          </div>
        </div>

        {post?.coverImage ? (
          // next/image has no meaning here: this renders through satori.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            width={COVER_WIDTH}
            height={size.height}
            style={{ width: COVER_WIDTH, height: size.height, objectFit: "cover" }}
          />
        ) : (
          <div style={{ display: "flex", width: COVER_WIDTH, height: size.height, backgroundImage: OG.neon, opacity: 0.85 }} />
        )}
      </div>
    ),
    { ...size, fonts: await loadOgFonts() }
  );
}
