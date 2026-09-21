const FRACTIONS: [number, string][] = [
  [1 / 8, '⅛'],
  [1 / 4, '¼'],
  [1 / 3, '⅓'],
  [3 / 8, '⅜'],
  [1 / 2, '½'],
  [5 / 8, '⅝'],
  [2 / 3, '⅔'],
  [3 / 4, '¾'],
  [7 / 8, '⅞'],
];

// Half the gap between the closest fractions (⅓ and ⅜), so no amount matches two.
const TOLERANCE = 0.02;

const INVARIANT_UNITS = new Set(['tbsp', 'tsp', 'oz', 'lb', 'g', 'kg', 'ml', 'l']);

function formatQty(qty: number): string {
  const whole = Math.floor(qty);
  const remainder = qty - whole;
  if (remainder < TOLERANCE) return String(whole);
  if (remainder > 1 - TOLERANCE) return String(whole + 1);

  const fraction = FRACTIONS.find(([value]) => Math.abs(value - remainder) < TOLERANCE);
  if (!fraction) return String(Math.round(qty * 100) / 100);
  return whole > 0 ? `${whole}${fraction[1]}` : fraction[1];
}

function pluralize(unit: string): string {
  if (INVARIANT_UNITS.has(unit)) return unit;
  return /(s|x|z|ch|sh)$/.test(unit) ? `${unit}es` : `${unit}s`;
}

export function formatMeasure(qty: number, unit?: string): string {
  const amount = formatQty(qty);
  if (!unit) return amount;
  return `${amount} ${qty > 1 + TOLERANCE ? pluralize(unit) : unit}`;
}
