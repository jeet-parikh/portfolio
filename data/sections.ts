export const sections = [
  { id: "who", n: "01", label: "Who" },
  { id: "work", n: "02", label: "Work" },
  { id: "record", n: "03", label: "Record" },
  { id: "pictures", n: "04", label: "Pictures" },
  { id: "reach", n: "05", label: "Reach" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
