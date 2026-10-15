import { ImageResponse } from "next/og";
import { getPost } from "@/utils/hashnode";
import { SITE_NAME } from "@/utils/site";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COVER_WIDTH = 420;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const post = await getPost((await params).blogSlug);
  const title = post?.title ?? "Article";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0f172a",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
          }}
        >
          <div style={{ display: "flex", width: 120, height: 8, background: "#10b981" }} />
          <div
            style={{
              fontSize: title.length > 70 ? 48 : title.length > 45 ? 56 : 64,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#94a3b8" }}>
            {SITE_NAME}
            {post ? ` · ${post.readTimeInMinutes} min read` : ""}
          </div>
        </div>

        {post?.coverImage && (
          // The article's real cover art, kept in its own column so it never
          // sits behind the title.
          // next/image has no meaning here: this renders through satori.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            width={COVER_WIDTH}
            height={size.height}
            style={{ width: COVER_WIDTH, height: size.height, objectFit: "cover" }}
          />
        )}
      </div>
    ),
    size
  );
}
