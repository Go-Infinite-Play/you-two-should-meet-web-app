import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "You've been invited to be a matchmaker!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FBF7F4 0%, #FEF0F0 50%, #F5F0FF 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🤝</div>
        <div
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: "#1A1A2E",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "20px",
          }}
        >
          You&apos;ve been invited to be a matchmaker!
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#6B7280",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          A friend trusts you to find them someone great. Open the link to see what they&apos;re looking for.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "36px",
            fontSize: "20px",
            color: "#E8636F",
            fontWeight: 600,
          }}
        >
          💕 You Two Should Meet
        </div>
      </div>
    ),
    { ...size }
  );
}
