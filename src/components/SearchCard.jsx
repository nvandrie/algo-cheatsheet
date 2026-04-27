import { Tag } from "./helpers/Tag";
import C from "../palette";

export function SearchCard({ algo }) {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "solid var(--border)",
        borderRadius: 12,
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: algo.color.border,
            display: "inline-block",
          }}
        />
        <span style={{ fontWeight: 500, fontSize: 15 }}>{algo.name}</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <Tag color={algo.color}>Time: {algo.complexity}</Tag>
        <Tag color={C.gray}>Uses: {algo.structure}</Tag>
      </div>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: "var(--text)",
          margin: "0 0 12px",
        }}
      >
        {algo.why}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          ["Best for", algo.best, C.teal],
          ["Worse for", algo.worst, C.coral],
        ].map(([label, text, c]) => (
          <div
            key={label}
            style={{
              background: c.bg,
              border: `0.5px solid ${c.border}`,
              borderRadius: 8,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: c.text,
                marginBottom: 4,
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 13, color: c.text }}>{text}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          fontSize: 13,
          color: "var(--text)",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "var(--text-h)", fontWeight: 500 }}>
          Common uses:{" "}
        </strong>
        {algo.use}
      </div>
    </div>
  );
}
