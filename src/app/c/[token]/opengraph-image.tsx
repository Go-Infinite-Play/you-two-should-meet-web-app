import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Someone thinks you two should meet!";
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
          background: "linear-gradient(135deg, #FBF7F4 0%, #FEF0F0 50%, #FFF8F0 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://youtwoshouldmeet.app/icon.png"
          alt=""
          width={140}
          height={140}
          style={{ marginBottom: "24px" }}
        />
        <div
          style={{
            fontSize: "48px",
            fontWeight: 800,
            color: "#1A1A2E",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
            marginBottom: "16px",
          }}
        >
          Someone thinks you two should meet!
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
          A friend wrote a personal recommendation for you
        </div>
      </div>
    ),
    { ...size }
  );
}
