export const sections = [
  { id: "opening", n: "01", label: "Opening" },
  { id: "origin", n: "02", label: "Origin" },
  { id: "work", n: "03", label: "Work" },
  { id: "record", n: "04", label: "Record" },
  { id: "tools", n: "05", label: "Tools" },
  { id: "write", n: "06", label: "Write" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
