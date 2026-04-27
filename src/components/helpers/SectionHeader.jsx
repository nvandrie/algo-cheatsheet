export function SectionHeader({ id, title, subtitle }) {
  return (
    <div id={id} style={{ paddingTop: 80, marginBottom: 32 }}>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 600,
          margin: "0 0 6px",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: 40,
          height: 2,
          background: "var(--border)",
          marginTop: 16,
          borderRadius: 2,
        }}
      />
    </div>
  );
}
