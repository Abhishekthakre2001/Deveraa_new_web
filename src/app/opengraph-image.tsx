import { ImageResponse } from "next/og";

export const alt = "DevEraa — Premium software development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #f8fbff 0%, #e8edff 52%, #d9f3ff 100%)",
          color: "#0f172a",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "36px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "64px",
            width: "100%",
          }}
        >
          <div style={{ color: "#2563eb", fontSize: 30, fontWeight: 700 }}>DevEraa</div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-2px", lineHeight: 1.1 }}>
            Premium Software Development
          </div>
          <div style={{ color: "#475569", fontSize: 28 }}>
            Build modern web, mobile, SaaS and AI products.
          </div>
        </div>
      </div>
    ),
    size
  );
}
