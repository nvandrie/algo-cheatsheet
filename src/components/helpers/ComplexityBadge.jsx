import { Tag } from "./Tag";
import C from "../../palette";

export function ComplexityBadge({ label }) {
  const grade =
    label.includes("n²") || label.includes("n!") || label.includes("c^n")
      ? "bad"
      : label.includes("n log")
        ? "ok"
        : label.includes("O(n)")
          ? "linear"
          : "good";
  const colors = { good: C.teal, ok: C.amber, linear: C.blue, bad: C.coral };
  return <Tag color={colors[grade]}>{label}</Tag>;
}
