import { useState, useEffect, useRef, useCallback } from "react";
import { ComplexityBadge } from "./helpers/ComplexityBadge";
import { SORTING_ALGORITHMS } from "../data";

const BAR_COUNT = 50;

function generateArray() {
  return Array.from(
    { length: BAR_COUNT },
    () => Math.floor(Math.random() * 90) + 10,
  );
}

export function SortVisualizer() {
  const [baseArray, setBaseArray] = useState(generateArray);
  const [selected, setSelected] = useState("Quicksort");
  const [frames, setFrames] = useState([]);
  const [frameIdx, setFrameIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef();

  const algo = SORTING_ALGORITHMS[selected];

  const buildFrames = useCallback(
    (arr) => {
      const f = algo.step(arr);
      setFrames(f);
      setFrameIdx(0);
      setPlaying(false);
    },
    [algo],
  );

  useEffect(() => {
    buildFrames(baseArray);
  }, [baseArray, buildFrames]);

  const reset = () => {
    const arr = generateArray();
    setBaseArray(arr);
  };

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setFrameIdx((i) => {
          if (i >= frames.length - 1) {
            setPlaying(false);
            return i;
          }
          return i + 1;
        });
      }, 160);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, frames.length]);

  const currentArr = frames[frameIdx]?.arr ?? baseArray;
  const max = Math.max(...currentArr);

  const frame = frames[frameIdx];
  const activeIdx =
    frame?.pivot ?? frame?.current ?? frame?.merging?.[0] ?? null;

  return (
    <div>
      {/* Algorithm tabs */}
      <div
        style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}
      >
        {Object.keys(SORTING_ALGORITHMS).map((name) => {
          const a = SORTING_ALGORITHMS[name];
          const active = selected === name;
          return (
            <button
              key={name}
              onClick={() => setSelected(name)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 13,
                cursor: "pointer",
                border: active
                  ? `1.5px solid ${a.color.border}`
                  : "0.5px solid var(--border)",
                background: active ? a.color.bg : "transparent",
                color: active ? a.color.text : "var(--text)",
                fontWeight: active ? 500 : 400,
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Complexity row */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 20,
          fontSize: 13,
        }}
      >
        {[
          ["Best", algo.best],
          ["Average", algo.avg],
          ["Worst", algo.worst],
          ["Space", algo.space],
        ].map(([label, val]) => (
          <div key={label}>
            <span style={{ color: "var(--text)", marginRight: 6 }}>
              {label}
            </span>
            <ComplexityBadge label={val} />
          </div>
        ))}
      </div>

      {/* Why it matters */}
      <p
        style={{
          fontSize: 14,
          color: "var(--text)",
          lineHeight: 1.6,
          marginBottom: 20,
        }}
      >
        {algo.why}
      </p>

      {/* Bar chart */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
          height: 160,
          padding: "0 0 4px",
          marginBottom: 12,
          borderBottom: "0.5px solid var(--border)",
          position: "relative",
        }}
      >
        {currentArr.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(v / max) * 100}%`,
              background: i === activeIdx ? algo.color.border : algo.color.bg,
              border: `0.5px solid ${algo.color.border}`,
              borderRadius: "2px 2px 0 0",
              transition: "height 0.08s",
            }}
          />
        ))}
      </div>

      {/* Progress + controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <input
          type="range"
          min={0}
          max={Math.max(frames.length - 1, 0)}
          value={frameIdx}
          onChange={(e) => {
            setFrameIdx(Number(e.target.value));
            setPlaying(false);
          }}
          style={{ flex: 1, minWidth: 120 }}
        />
        <span
          style={{
            fontSize: 12,
            color: "var(--text)",
            whiteSpace: "nowrap",
          }}
        >
          Step {frameIdx} / {frames.length}
        </span>
        <button
          onClick={() =>
            setPlaying((p) => {
              if (frameIdx >= frames.length - 1) {
                setFrameIdx(0);
              }
              return !p;
            })
          }
          style={{
            padding: "6px 16px",
            borderRadius: 8,
            fontSize: 13,
            cursor: "pointer",
            background: algo.color.bg,
            color: algo.color.text,
            border: `0.5px solid ${algo.color.border}`,
            fontWeight: 500,
          }}
        >
          {playing
            ? "Pause"
            : frameIdx >= frames.length - 1
              ? "Replay"
              : "Play"}
        </button>
        <button
          onClick={reset}
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 13,
            cursor: "pointer",
            background: "transparent",
            color: "var(--text)",
            border: "0.5px solid var(--border)",
          }}
        >
          New array
        </button>
      </div>
    </div>
  );
}
