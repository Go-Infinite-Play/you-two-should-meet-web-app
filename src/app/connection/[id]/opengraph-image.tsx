import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "It's a Match! — You Two Should Meet";
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
          background: "linear-gradient(135deg, #FBF7F4 0%, #FEF0F0 40%, #FFECD2 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎉</div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#1A1A2E",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "20px",
          }}
        >
          It&apos;s a Match!
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
          A friend connected two people who were meant to meet. This is what happens when your friends play matchmaker.
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
