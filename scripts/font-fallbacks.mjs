// Computes fallback @font-face overrides (size-adjust, ascent/descent/line-gap)
// so the swap from fallback to web font does not move layout. Source: Capsize metrics.
import { createFontStack } from '@capsizecss/core';
import instrumentSerif from '@capsizecss/metrics/instrumentSerif';
import plexSans from '@capsizecss/metrics/iBMPlexSans';
import plexMono from '@capsizecss/metrics/iBMPlexMono';
import timesNewRoman from '@capsizecss/metrics/timesNewRoman';
import arial from '@capsizecss/metrics/arial';
import courierNew from '@capsizecss/metrics/courierNew';

for (const [web, fb] of [[instrumentSerif, timesNewRoman], [plexSans, arial], [plexMono, courierNew]]) {
  const { fontFamily, fontFaces } = createFontStack([web, fb], { fontFaceFormat: 'styleString' });
  console.log(`/* ${web.familyName} -> ${fb.familyName} */\n/* stack: ${fontFamily} */\n${fontFaces}\n`);
}
