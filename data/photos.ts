export const photos = [
  {
    id: "irvine",
    place: "Irvine",
    caption: "Home. It stays light later than I expect.",
    tone: "coast",
  },
  {
    id: "salt-lake",
    place: "Salt Lake",
    caption: "Mountains right behind the lab.",
    tone: "range",
  },
  {
    id: "new-haven",
    place: "New Haven",
    caption: "A lot of stone, and a lot of walking.",
    tone: "stone",
  },
  {
    id: "new-york",
    place: "New York",
    caption: "Summer, mostly on foot.",
    tone: "blocks",
  },
  {
    id: "mountain-view",
    place: "Mt. View",
    caption: "After work, before I head back.",
    tone: "evening",
  },
  {
    id: "on-the-way",
    place: "On the way",
    caption: "The part of the trip that isn't a destination.",
    tone: "road",
  },
] as const;

export type Photo = (typeof photos)[number];
export type PhotoTone = Photo["tone"];
