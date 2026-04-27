import C from "./palette";

const NAV_SECTIONS = [
  { id: "big-o", label: "Asymptotic Notation" },
  { id: "data-structures", label: "Data Structures" },
  { id: "sorting", label: "Sorting Algorithms" },
  { id: "searching", label: "Search Algorithms" },
];

const COMPLEXITY_CLASSES = [
  { name: "O(1)", cap: 1, color: "#0F6E56", fn: () => 1 },
  { name: "O(log n)", cap: null, color: "#185FA5", fn: (n) => Math.log2(n) },
  { name: "O(n)", cap: 50, color: "#534AB7", fn: (n) => n },
  {
    name: "O(n log n)",
    cap: 150,
    color: "#854F0B",
    fn: (n) => n * Math.log2(n),
  },
  { name: "O(n²)", cap: 800, color: "#993C1D", fn: (n) => n * n },
];

const DATA_STRUCTURES = [
  {
    name: "Array",
    color: C.blue,
    tagline: "Sequential, index-based storage",
    why: "Constant-time indexing makes arrays ideal when you know what you're looking for and where. Good for when when random access is most common use case.",
    ops: { Index: "O(1)", Search: "O(n)", Insert: "O(n)", Delete: "O(n)" },
    tradeoff:
      "Fast reads, slow writes (except at end). Static arrays waste memory; dynamic arrays resize inefficienctly with O(n).",
  },
  {
    name: "Linked List",
    color: C.teal,
    tagline: "Node chains optimized for mutations",
    why: "When your workload is mostly insertions/deletions at known positions, linked lists beat arrays. No shifting required.",
    ops: { Index: "O(n)", Search: "O(n)", Insert: "O(1)", Delete: "O(1)" },
    tradeoff:
      "Pointer overhead and poor cache locality. Never use when random access is frequent.",
  },
  {
    name: "Hash Table",
    color: C.amber,
    tagline: "Key-value lookup in constant time",
    why: "The go-to when you need fast lookup by a key (e.g. database indexes, caches, frequency counting, deduplication).",
    ops: { Index: "O(1)", Search: "O(1)", Insert: "O(1)", Delete: "O(1)" },
    tradeoff:
      "Hash collisions degrade to O(n) worst case. This data structures is also unordered, limiting iteration.",
  },
  {
    name: "Binary Tree (BST)",
    color: C.purple,
    tagline: "Hierarchical, sorted structure",
    why: "Keeps data sorted as you insert. Range queries, in-order traversal, and child/parent lookups are simple.",
    ops: {
      Index: "O(log n)",
      Search: "O(log n)",
      Insert: "O(log n)",
      Delete: "O(log n)",
    },
    tradeoff:
      "Unbalanced trees collapse to O(n). Use balanced variants (AVL, Red-Black) in production.",
  },
];

const SORTING_ALGORITHMS = {
  "Selection Sort": {
    color: C.coral,
    best: "O(n²)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    why: "Virtually never the right choice, but simplest to implement and useful for teaching. Sorts in-place with minimal swaps.",
    step: (arr) => {
      // One full pass of selection sort, yields after each swap
      const a = [...arr];
      const steps = [];
      for (let i = 0; i < a.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < a.length; j++) {
          if (a[j] < a[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
          [a[minIdx], a[i]] = [a[i], a[minIdx]];
        }
        steps.push({ arr: [...a], sorted: i + 1 });
      }
      return steps;
    },
  },
  "Insertion Sort": {
    color: C.blue,
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    why: "Excellent for nearly-sorted data and small arrays. Often used as the base case in hybrid sorts like Timsort (e.g. Python's sorted()).",
    step: (arr) => {
      const a = [...arr];
      const steps = [];
      for (let i = 1; i < a.length; i++) {
        let j = i;
        while (j > 0 && a[j - 1] > a[j]) {
          [a[j], a[j - 1]] = [a[j - 1], a[j]];
          j--;
        }
        steps.push({ arr: [...a], current: i });
      }
      return steps;
    },
  },
  "Merge Sort": {
    color: C.teal,
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    why: "Guaranteed O(n log n), so use when worst-case matters (e.g. external sorting, stability required). Java's Arrays.sort uses a variant for Object arrays.",
    step: (arr) => {
      const steps = [];
      const a = [...arr];
      function merge(arr, l, m, r) {
        const left = arr.slice(l, m + 1);
        const right = arr.slice(m + 1, r + 1);
        let i = 0,
          j = 0,
          k = l;
        while (i < left.length && j < right.length) {
          if (left[i] <= right[j]) arr[k++] = left[i++];
          else arr[k++] = right[j++];
        }
        while (i < left.length) arr[k++] = left[i++];
        while (j < right.length) arr[k++] = right[j++];
        steps.push({ arr: [...arr], merging: [l, r] });
      }
      function mergeSort(arr, l, r) {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
      }
      mergeSort(a, 0, a.length - 1);
      return steps;
    },
  },
  Quicksort: {
    color: C.purple,
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    why: "Fastest in practice for most inputs due to cache efficiency. Used in C's qsort, Java's Arrays.sort for primitives, and many embedded systems libraries.",
    step: (arr) => {
      const steps = [];
      const a = [...arr];
      function partition(arr, lo, hi) {
        const pivot = arr[hi];
        let i = lo - 1;
        for (let j = lo; j < hi; j++) {
          if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }
        [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
        return i + 1;
      }
      function quickSort(arr, lo, hi) {
        if (lo >= hi) return;
        const p = partition(arr, lo, hi);
        steps.push({ arr: [...arr], pivot: p });
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
      }
      quickSort(a, 0, a.length - 1);
      return steps;
    },
  },
};

const SEARCH_ALGORITHMS = [
  {
    name: "Breadth-First Search (BFS)",
    color: C.blue,
    complexity: "O(|V| + |E|)",
    use: "Shortest path in unweighted graphs, level-order traversal, finding nearest neighbors",
    structure: "Queue (FIFO)",
    best: "Wide, shallow trees or graphs",
    worst: "Deep, narrow trees (explores many useless levels)",
    why: "BFS guarantees the shortest path in an unweighted graph. It explores each of a node's neighbors before going deeper.",
  },
  {
    name: "Depth-First Search (DFS)",
    color: C.purple,
    complexity: "O(|V| + |E|)",
    use: "Cycle detection, topological sort, connected components, maze solving",
    structure: "Stack (LIFO) or recursion",
    best: "Deep, narrow trees (follows one path to the end)",
    worst:
      "Wide, shallow trees. The right answer may be one level down but far right",
    why: "DFS uses less memory than BFS (stack vs queue). Prefer it when you care about exploring a full path, not the shortest.",
  },
];

export {
  NAV_SECTIONS,
  COMPLEXITY_CLASSES,
  DATA_STRUCTURES,
  SORTING_ALGORITHMS,
  SEARCH_ALGORITHMS,
};
