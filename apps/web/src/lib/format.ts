export interface ParsedCounter {
  /** null when the value has no number in it — an em dash awaiting a real figure, for instance. */
  readonly numeric: number | null;
  readonly suffix: string;
  readonly decimals: number;
  readonly raw: string;
}

/**
 * Counter values carry their own suffix: "40+", "99.99+", "—". The number animates, the suffix is
 * styled separately in the accent colour, and a value with no number renders as-is.
 */
export const parseCounter = (raw: string): ParsedCounter => {
  const match = /^(\d+(?:[.,]\d+)?)(.*)$/.exec(raw.trim());

  if (!match) {
    return { numeric: null, suffix: '', decimals: 0, raw };
  }

  const [, digits, suffix] = match;
  const normalised = digits.replace(',', '.');
  const decimals = normalised.includes('.') ? normalised.split('.')[1].length : 0;

  return { numeric: Number(normalised), suffix: suffix.trim(), decimals, raw };
};

export const formatCounter = (value: number, decimals: number): string =>
  decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-GB');

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** ISO date in, "14 Aug 2026" out. Returns the input unchanged if it is not a date. */
export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : DATE_FORMAT.format(date);
};
