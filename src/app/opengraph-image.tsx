import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "You Two Should Meet — Your friends know you better than an algorithm";
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
          background: "linear-gradient(135deg, #FBF7F4 0%, #FEF0F0 50%, #FBF7F4 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ fontSize: "64px" }}>💕</div>
        </div>
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
          You Two Should Meet
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#6B7280",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          Your friends know you better than an algorithm
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "40px",
            background: "linear-gradient(135deg, #E8636F, #F2949B)",
            color: "white",
            padding: "16px 40px",
            borderRadius: "20px",
            fontSize: "22px",
            fontWeight: 700,
          }}
        >
          The anti-dating app
        </div>
      </div>
    ),
    { ...size }
  );
}
