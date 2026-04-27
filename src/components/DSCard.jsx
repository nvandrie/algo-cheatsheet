import { useState, useEffect, useRef, useCallback } from "react";
import { ComplexityBadge } from "./helpers/ComplexityBadge";

export function DSCard({ ds }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "var(--bg)",
        border: `solid var(--border)`,
        borderRadius: 12,
        padding: "16px 20px",
        cursor: "pointer",
        transition: "border-color 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = ds.color.border)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
      onClick={() => setOpen((o) => !o)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: ds.color.border,
                display: "inline-block",
              }}
            />
            <span style={{ fontWeight: 500, fontSize: 16 }}>{ds.name}</span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--text)",
            }}
          >
            {ds.tagline}
          </p>
        </div>
        <span
          style={{
            fontSize: 18,
            color: "var(--text)",
            marginLeft: 12,
          }}
        >
          {open ? "-" : "+"}
        </span>
      </div>

      {open && (
        <div
          style={{
            marginTop: 16,
            borderTop: "0.5px solid var(--border)",
            paddingTop: 16,
          }}
        >
          {/* Why */}
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--text)",
              margin: "0 0 14px",
            }}
          >
            <strong style={{ color: "var(--text-h)", fontWeight: 500 }}>
              Why use it:{" "}
            </strong>
            {ds.why}
          </p>

          {/* Complexity table */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              marginBottom: 14,
            }}
          >
            {Object.entries(ds.ops).map(([op, val]) => (
              <div
                key={op}
                style={{
                  background: "var(--bg-social)",
                  borderRadius: 8,
                  padding: "8px 10px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text)",
                    marginBottom: 4,
                  }}
                >
                  {op}
                </div>
                <ComplexityBadge label={val} />
              </div>
            ))}
          </div>

          {/* Tradeoff */}
          <div
            style={{
              borderLeft: `2px solid ${ds.color.border}`,
              paddingLeft: 12,
              fontSize: 13,
              color: "var(--text)",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: ds.color.text, fontWeight: 500 }}>
              Watch out:{" "}
            </strong>
            {ds.tradeoff}
          </div>
        </div>
      )}
    </div>
  );
}
