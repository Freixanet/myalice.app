#!/usr/bin/env bash
# Fails if any CSS or .astro file under src/ contains a literal design value
# instead of var(--token). Documented exceptions (see 08-QA.md):
#   E1 src/styles/tokens.css   the only place values are defined
#   E2 src/styles/fonts.css    @font-face metadata (weights, override %, unicode-range)
#   E3 lines starting with @media / @container   breakpoints cannot use var()
#   E4 SVG geometry attributes (viewBox, d, x, y, width, height, rx, stroke-width) are
#      unitless numbers and do not match the pattern; nothing to exclude.
#   E5 0, percentages (100%, 50%, 85%…) and fr units do not match the pattern.
#   E6 opacity: 0 and opacity: 1 are on/off states and allowed; fractional opacity is not.
# Exit 0 and print nothing when clean. Exit 1 and print file:line:match otherwise.
set -u
ROOT="${1:-src}"
PATTERN='#[0-9a-fA-F]{3,8}\b|\b[0-9]*\.?[0-9]+(px|rem|em|vw|vh|svh|dvh|lvh|ch|ms|s|deg)\b|\b(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color-mix|cubic-bezier)\(|(font-weight|z-index|line-height|letter-spacing|transition-duration|animation-duration)[[:space:]]*:[[:space:]]*-?[0-9]|opacity[[:space:]]*:[[:space:]]*0?\.[0-9]'
HITS=$(grep -rnE "$PATTERN" "$ROOT" --include='*.css' --include='*.astro' \
  | grep -v '^[^:]*/tokens\.css:' \
  | grep -v '^[^:]*/fonts\.css:' \
  | grep -vE '^[^:]+:[0-9]+:[[:space:]]*@(media|container)[[:space:](]')
if [ -n "$HITS" ]; then
  echo "$HITS"
  echo "Hardcoded values found: $(echo "$HITS" | wc -l | tr -d ' ')"
  exit 1
fi
exit 0
