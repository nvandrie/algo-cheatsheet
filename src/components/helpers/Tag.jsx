import C from "../../palette";

export function Tag({ children, color, onClick }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 20,
        background:
          color === undefined ? "var(--bg)" : (color?.bg ?? "var(--accent-bg)"),
        color: color?.text ?? C.gray.text,
        border: `0.5px solid ${color?.border ?? C.gray.border}`,
      }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
