import { useState, useEffect, useRef, useCallback } from "react";
import { Tag } from "./helpers/Tag";
import { COMPLEXITY_CLASSES } from "../data";

export function BigOChart() {
  const [n, setN] = useState(20);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const canvasRef = useRef();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const PAD = { top: 20, right: 60, bottom: 40, left: 50 };
    const chartW = W - PAD.left - PAD.right;
    const chartH = H - PAD.top - PAD.bottom;

    ctx.clearRect(0, 0, W, H);

    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const textColor = dark ? "#c2c0b6" : "#3d3d3a";
    const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";

    const visibleClasses = COMPLEXITY_CLASSES.filter((c) =>
      selectedClasses.includes(c.name),
    );

    const maxY =
      visibleClasses.length === 0
        ? 1
        : Math.max(
            ...visibleClasses.map(({ fn, cap }) =>
              cap != null
                ? Math.min(fn(Math.max(n, 0.001)), cap)
                : fn(Math.max(n, 0.001)),
            ),
          );

    const toX = (x) => PAD.left + (x / n) * chartW;
    const toY = (y) => PAD.top + chartH - (Math.min(y, maxY) / maxY) * chartH;

    // Grid
    const Y_TICKS = 4;
    ctx.fillStyle = textColor;
    ctx.font = "11px sans-serif";
    ctx.textAlign = "right";

    for (let i = 0; i <= Y_TICKS; i++) {
      const val = (maxY / Y_TICKS) * i;
      const y = toY(val);

      // Format: show integers if small, abbreviate if large
      const label =
        val >= 1000
          ? `${(val / 1000).toFixed(1)}k`
          : val >= 1
            ? Math.round(val).toString()
            : val.toFixed(2);

      ctx.fillText(label, PAD.left - 6, y + 3);

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + chartW, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(PAD.left, PAD.top);
    ctx.lineTo(PAD.left, PAD.top + chartH);
    ctx.lineTo(PAD.left + chartW, PAD.top + chartH);
    ctx.stroke();

    // Labels
    ctx.fillStyle = textColor;
    ctx.font = "11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("n", PAD.left + chartW / 2, H - 4);
    ctx.fillText(`0`, PAD.left, PAD.top + chartH + 14);
    ctx.fillText(`${n}`, PAD.left + chartW, PAD.top + chartH + 14);

    // Lines
    visibleClasses.forEach(({ name, color, fn }) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let started = false;
      for (let xi = 0; xi <= 120; xi++) {
        const xv = (xi / 120) * n;
        const yv = fn(Math.max(xv, 0.001));
        const px = toX(xv),
          py = toY(yv);
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // End label
      const endX = n,
        endY = fn(Math.max(n, 0.001));
      if (endY <= maxY * 1.05) {
        ctx.fillStyle = color;
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(
          name,
          toX(endX) + 4,
          Math.max(toY(endY) + 3, PAD.top + 10),
        );
      }
    });

    // N marker line
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(toX(n), PAD.top);
    ctx.lineTo(toX(n), PAD.top + chartH);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [n, selectedClasses]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 13 }}>Input size n =</span>
        <input
          type="range"
          min={5}
          max={100}
          step={1}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ width: 180 }}
        />
        <span style={{ fontSize: 16, fontWeight: 500, minWidth: 28 }}>{n}</span>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginLeft: "auto",
          }}
        >
          {COMPLEXITY_CLASSES.map(({ name, color }) => (
            <Tag
              key={name}
              color={selectedClasses.includes(name) ? color : undefined}
              onClick={() => {
                setSelectedClasses((prev) =>
                  prev.includes(name)
                    ? prev.filter((n) => n !== name)
                    : [...prev, name],
                );
              }}
            >
              <span
                className="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  boxShadow: selectedClasses.includes(name)
                    ? "none"
                    : "var(--shadow)",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 2,
                    background: color,
                    borderRadius: 1,
                    display: "inline-block",
                  }}
                />
                {name}
              </span>
            </Tag>
          ))}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={640}
        height={300}
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Big-O complexity growth chart"
        role="img"
      />
    </div>
  );
}
