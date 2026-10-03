export type TravelPlace = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  note?: string;
};
// Populate with Jeet's confirmed destinations; don't infer trips from photos.
export const travelPlaces: TravelPlace[] = [];
