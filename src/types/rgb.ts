export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert RGB object to hex color string
 */
export function rgbToHex(rgb: Rgb): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}
