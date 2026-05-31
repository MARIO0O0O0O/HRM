import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/client";

export const runtime = "edge";
export const alt = "BizHR Resources";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from("content_articles")
    .select("title, content_categories(name)")
    .eq("slug", params.slug)
    .single();

  const title = article?.title || "BizHR Resources";
  // @ts-ignore
  const categoryName = article?.content_categories?.name || "Guide";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #0a0a0a, #111111)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                background: "rgba(99, 102, 241, 0.2)",
                border: "1px solid rgba(99, 102, 241, 0.5)",
                color: "#818cf8",
                padding: "8px 16px",
                borderRadius: "100px",
                fontSize: "24px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {categoryName}
            </div>
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#f4f4f5",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "24px",
                background: "linear-gradient(to right, #818cf8, #22d3ee)",
                marginRight: "20px",
              }}
            />
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#ffffff" }}>
              BizHR
            </div>
          </div>
          <div style={{ fontSize: "24px", color: "#a1a1aa", fontWeight: 500 }}>
            Done-for-you HR for California SMBs
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
