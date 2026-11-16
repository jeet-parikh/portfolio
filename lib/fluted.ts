// Fluted (reeded) glass, drawn on a canvas.
//
// Every reed is a small cylindrical lens. Across a reed, u runs from -1 to 1; the lens
// samples near the reed's centre in the middle (magnifying) and far from it at the
// edges (compressing), flipped. That curve bends straight edges behind the glass into
// the arcs you see through real reeded glass. It is drawn one pixel column at a time.

export const clamp = (v: number, a: number, b: number) =>
  Math.min(b, Math.max(a, v));

export function lens(
  ctx: CanvasRenderingContext2D,
  src: HTMLCanvasElement,
  {
    width,
    height,
    rib,
    power = 2.2,
    strength = 1.5,
    scale = 1,
  }: {
    width: number;
    height: number;
    rib: number;
    power?: number;
    strength?: number;
    /** Source pixels per destination pixel. */
    scale?: number;
  },
) {
  for (let x = 0; x < width; x++) {
    const x0 = x - (x % rib);
    const u = ((x - x0 + 0.5) / rib) * 2 - 1;
    const m = Math.sign(u) * Math.abs(u) ** power;
    const sx = clamp(
      (x0 + rib / 2 - m * (rib / 2) * strength) * scale,
      0,
      src.width - scale,
    );
    ctx.drawImage(src, sx, 0, scale, src.height, x, 0, 1, height);
  }
}

/** A radial gradient stretched into an ellipse. */
export function blob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  stops: [number, string][],
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(rx, ry);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  for (const [o, c] of stops) g.addColorStop(o, c);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Draws an image the way `object-fit: cover` would at w×h, then softens it side to
 * side only (halving the width in steps so it never aliases). Inside a reed the scene
 * goes soft horizontally but keeps its vertical detail.
 */
export function coverSource(
  img: HTMLImageElement,
  w: number,
  h: number,
  dpr: number,
  smear = 4,
) {
  const c = document.createElement("canvas");
  c.width = Math.round(w * dpr);
  c.height = Math.round(h * dpr);
  const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
  const dw = img.naturalWidth * s;
  const dh = img.naturalHeight * s;
  const ctx = c.getContext("2d");
  if (!ctx) return c;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, (c.width - dw) / 2, (c.height - dh) / 2, dw, dh);
  let narrow = c;
  for (let w2 = c.width / 2; w2 >= c.width / smear; w2 /= 2) {
    const n = document.createElement("canvas");
    n.width = Math.max(1, Math.round(w2));
    n.height = c.height;
    n.getContext("2d")?.drawImage(narrow, 0, 0, n.width, n.height);
    narrow = n;
  }
  ctx.drawImage(narrow, 0, 0, c.width, c.height);
  return c;
}
