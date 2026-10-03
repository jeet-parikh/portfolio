export type MapView = { x: number; y: number; zoom: number };
export function constrainMap(
  view: MapView,
  width: number,
  height: number,
): MapView {
  return {
    zoom: view.zoom,
    x: Math.min(0, Math.max(width * (1 - view.zoom), view.x)),
    y: Math.min(0, Math.max(height * (1 - view.zoom), view.y)),
  };
}
export function zoomMap(
  view: MapView,
  zoom: number,
  x: number,
  y: number,
  width: number,
  height: number,
): MapView {
  const next = Math.max(1, Math.min(8, zoom));
  const ratio = next / view.zoom;
  return constrainMap(
    { zoom: next, x: x - (x - view.x) * ratio, y: y - (y - view.y) * ratio },
    width,
    height,
  );
}
