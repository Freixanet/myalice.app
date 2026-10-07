// Fluid clamp() between a 375px and a 1280px viewport, root 16px.
const MIN_VW = 375, MAX_VW = 1280;
const r = n => +n.toFixed(4);
export const fluid = (minPx, maxPx) => {
  const slope = (maxPx - minPx) / (MAX_VW - MIN_VW);
  const intercept = minPx - slope * MIN_VW;
  return `clamp(${r(minPx / 16)}rem, ${r(intercept / 16)}rem + ${r(slope * 100)}vw, ${r(maxPx / 16)}rem)`;
};
const scale = {
  '--text-display': [44, 84], '--text-h2': [34, 56], '--text-h3': [24, 30], '--text-lead': [18, 21],
  '--text-body': [16, 17], '--text-small': [14, 15], '--text-label': [12, 13], '--text-code': [14, 15],
  '--space-section': [80, 160], '--space-gutter': [16, 40], '--space-stack-lg': [48, 80],
};
for (const [k, [a, b]] of Object.entries(scale)) console.log(`${k}: ${fluid(a, b)}; /* ${a}px @375 → ${b}px @1280 */`);
