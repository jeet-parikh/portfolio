export const sections = [
  { id: "who", n: "01", label: "Who" },
  { id: "work", n: "02", label: "Work" },
  { id: "record", n: "03", label: "Record" },
  { id: "write", n: "04", label: "Write" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
