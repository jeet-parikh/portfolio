export const WIDTH = 480;
export const HEIGHT = 360;
export const PLAYER_X = 108;
export const RADIUS = 16;
export const GAP = 126;
export const PIPE_WIDTH = 58;
export type Gate = { x: number; center: number; scored: boolean };
export type Flight = {
  y: number;
  velocity: number;
  distance: number;
  score: number;
  gates: Gate[];
  dead: boolean;
};
export function freshFlight(): Flight {
  return {
    y: 170,
    velocity: 0,
    distance: 0,
    score: 0,
    gates: [{ x: 480, center: 170, scored: false }],
    dead: false,
  };
}
export function flap(s: Flight) {
  if (!s.dead) s.velocity = -255;
}
export function stepFlight(s: Flight, dt: number, random = Math.random) {
  if (s.dead) return;
  const speed = 135 + Math.min(s.score, 20) * 2;
  s.velocity += 740 * dt;
  s.y += s.velocity * dt;
  s.distance += speed * dt;
  for (const gate of s.gates) {
    gate.x -= speed * dt;
    if (!gate.scored && gate.x + PIPE_WIDTH < PLAYER_X - RADIUS) {
      gate.scored = true;
      s.score++;
    }
    if (
      PLAYER_X + RADIUS > gate.x &&
      PLAYER_X - RADIUS < gate.x + PIPE_WIDTH &&
      (s.y - RADIUS < gate.center - GAP / 2 ||
        s.y + RADIUS > gate.center + GAP / 2)
    )
      s.dead = true;
  }
  if (s.y - RADIUS < 0 || s.y + RADIUS > HEIGHT - 28) s.dead = true;
  const last = s.gates[s.gates.length - 1];
  if (last.x < WIDTH - 205)
    s.gates.push({
      x: WIDTH + 10,
      center: 100 + random() * 130,
      scored: false,
    });
  s.gates = s.gates.filter((g) => g.x + PIPE_WIDTH > -10);
}
