import { useState, useEffect, useRef, useCallback } from "react";
import { ComplexityBadge } from "./components/helpers/ComplexityBadge";
import { SectionHeader } from "./components/helpers/SectionHeader";
import { BigOChart } from "./components/BigOChart";
import { DSCard } from "./components/DSCard";
import { SearchCard } from "./components/SearchCard";
import { SortVisualizer } from "./components/SortVisualizer";
import {
  NAV_SECTIONS,
  DATA_STRUCTURES,
  SORTING_ALGORITHMS,
  SEARCH_ALGORITHMS,
} from "./data";
import C from "./palette";

export default function App() {
  const [activeSection, setActiveSection] = useState("big-o");

  // Track scroll position for active nav highlight
  useEffect(() => {
    const handler = () => {
      for (const s of [...NAV_SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(s.id);
          return;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 220,
          borderRight: "solid var(--border)",
          background: "var(--code-bg)",
          padding: "28px 0",
          overflowY: "auto",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "0 0 24px", textAlign: "center" }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Algorithms
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Cheat Sheet
          </div>
        </div>
        <div style={{ flex: 1, padding: "24px 0", background: "var(--bg)" }}>
          {NAV_SECTIONS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "9px 24px",
                  fontSize: 13,
                  cursor: "pointer",
                  background: active ? "var(--accent-bg)" : "transparent",
                  color: active ? "var(--text-h)" : "var(--text)",
                  fontWeight: active ? 500 : 400,
                  border: "none",
                  borderLeft: active
                    ? "2px solid var(--accent-border)"
                    : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div
          style={{
            padding: "16px 24px",
            borderTop: "solid var(--border)",
            fontSize: 11,
            color: "var(--text)",
            lineHeight: 1.5,
          }}
        >
          <b>Nathan Van Drie</b>
          <br />
          Spring 2026
        </div>
      </nav>

      {/* Main content */}
      <main
        style={{
          marginLeft: 220,
          flex: 1,
          maxWidth: "100%",
          padding: "20px 48px 120px",
        }}
      >
        {/* Hero */}
        <div style={{ paddingTop: 48, marginBottom: 8 }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 700,
              margin: "0 0 8px",
              lineHeight: 1.2,
            }}
          >
            Algorithms & Data Structures
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            This is a visual reference for common algorithms and data
            structures, their complexities, and when to use them. Many of these
            principles appear in technical interviews, but more importantly,
            they are the foundation for writing efficient code in any context.
            One of my biggest takeaways from being a Data Structures &
            Algorithms TA is that due to the emergence of AI, the focus of
            computer science education has somewhat shifted away from
            implementation details and towards higher-level problem solving and
            system design. With this in mind, this resource emphasizes not only
            the "how" but also the "why" behind each algorithm and data
            structure, to help you build intuition for when and how to apply
            these concepts in real-world coding scenarios.{" "}
          </p>
        </div>

        {/* ── Asymptotic Notation ── */}
        <SectionHeader
          id="big-o"
          title="Asymptotic Notation"
          subtitle="A way to compare algorithms based on the long-term growth trends of their time and space requirements rather than precise execution times, which vary by hardware."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {[
            {
              symbol: "O",
              name: "Big-O",
              desc: "Upper bound (worst-case) runtime. An algorithm never performs worse than its Big-O.",
            },
            {
              symbol: "Ω",
              name: "Big-Omega",
              desc: "Lower bound (best-case) runtime. An algorithm never performs better than its Big-Ω.",
            },
            {
              symbol: "θ",
              name: "Big-Theta",
              desc: "Tight bound runtime. The algorithm always runs at exactly this complexity.",
            },
          ].map(({ symbol, name, desc }) => (
            <div
              key={name}
              style={{
                background: "var(--social-bg)",
                borderRadius: 10,
                padding: "14px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  marginBottom: 4,
                  color: "var(--text-h)",
                }}
              >
                {symbol}
              </div>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 6 }}>
                {name}
              </div>
              <p
                style={{
                  fontSize: 13,
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "var(--bg)",
            border: "solid var(--border)",
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 500, marginBottom: 16, fontSize: 15 }}>
            Growth rate comparison
          </div>
          <BigOChart />
        </div>

        <div
          style={{
            background: C.amber.bg,
            border: `0.5px solid ${C.amber.border}`,
            borderRadius: 10,
            padding: "12px 16px",
            marginTop: 16,
            fontSize: 13,
            color: C.amber.text,
            lineHeight: 1.6,
          }}
        >
          <strong style={{ fontWeight: 500 }}>Important note: </strong>
          Big-O <em>only</em> tells us about theoretical performance. In the
          real world, factors like hardware and messy data can affect an
          algorithm's typical efficiency. For example, quicksort is O(n²) worst
          case, yet outperforms merge sort in practice due to CPU cache
          behavior. Always consider all conditions before dismissing an
          algorithm based on its notation alone.
        </div>

        {/* ── Data Structures ── */}
        <SectionHeader
          id="data-structures"
          title="Data Structures"
          subtitle="Click any structure to expand its complexity breakdown for key operations and examine real-world tradeoffs."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DATA_STRUCTURES.map((ds) => (
            <DSCard key={ds.name} ds={ds} />
          ))}
        </div>

        {/* ── Sorting ── */}
        <SectionHeader
          id="sorting"
          title="Sorting Algorithms"
          subtitle="Run the visualizer to see how each algorithm processes the same array. Explore how different distributions of the input data can impact the performance of each algorithm in practice, even if their theoretical complexities are the same."
        />

        <div
          style={{
            background: "var(--bg)",
            border: "solid var(--border)",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <SortVisualizer />
        </div>

        {/* Quick comparison table */}
        <div style={{ marginTop: 20, overflowX: "auto" }}>
          <table
            style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "0.5px solid var(--border)",
                }}
              >
                {[
                  "Algorithm",
                  "Best",
                  "Average",
                  "Worst",
                  "Space",
                  "Stable?",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 12px",
                      textAlign: "left",
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(SORTING_ALGORITHMS).map(([name, a], i) => (
                <tr
                  key={name}
                  style={{
                    borderBottom: "0.5px solid var(--border)",
                    background:
                      i % 2 === 1 ? "transparent" : "var(--social-bg)",
                  }}
                >
                  <td style={{ padding: "8px 12px", fontWeight: 500 }}>
                    {name}
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <ComplexityBadge label={a.best} />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <ComplexityBadge label={a.avg} />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <ComplexityBadge label={a.worst} />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <ComplexityBadge label={a.space} />
                  </td>
                  <td
                    style={{
                      padding: "8px 12px",
                    }}
                  >
                    {name === "Merge Sort" || name === "Insertion Sort"
                      ? "Yes"
                      : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Search Algorithms ── */}
        <SectionHeader
          id="searching"
          title="Search Algorithms"
          subtitle="BFS and DFS traverse the same structures differently. The right choice depends on graph shape and what you're looking for."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {SEARCH_ALGORITHMS.map((a) => (
            <SearchCard key={a.name} algo={a} />
          ))}
        </div>

        <div
          style={{
            background: "var(--social-bg)",
            borderRadius: 10,
            padding: "16px 20px",
            fontSize: 14,
            lineHeight: 1.65,
          }}
        >
          <strong style={{ color: "var(--text-h)", fontWeight: 500 }}>
            How do decide:{" "}
          </strong>
          Wide, shallow graph → BFS (shortest path guaranteed). Deep, narrow
          graph → DFS (memory efficient). Both run in O(V + E), so shape is what
          matters, not raw size.
        </div>
      </main>
    </div>
  );
}
