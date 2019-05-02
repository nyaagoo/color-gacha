import * as colorConverter from "color-convert";
/*
export default class colorUtil {
  convertHexToHsl(hex: string) {
    if (hex.startsWith("#")) hex = hex.slice(1, 7);
    colorConverter.hex.hsl(hex);
  }
}
*/

export function convertHexToHsl(hex: string): string {
  if (hex.startsWith("#")) hex = hex.slice(1, 7);
  const hsl = colorConverter.hex.hsl(hex);
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

export function selectTextColor(hex: string): "black" | "white";
export function selectTextColor(
  red: number,
  green: number,
  blue: number
): "black" | "white";
export function selectTextColor(
  hex?: any,
  red?: number,
  green?: number,
  blue?: number
): "black" | "white" {
  let r: number = 0;
  let g: number = 0;
  let b: number = 0;
  if (hex && hex.startsWith("#")) {
    const rgb = colorConverter.hex.rgb(hex.slice(1, 7));
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
  }
  if (red && green && blue) {
    r = red;
    g = green;
    b = blue;
  }
  // sRGB を RGB に変換し、背景色の相対輝度を求める
  const toRgbItem = (item: number) => {
    const i = item / 255;
    return i <= 0.03928 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
  };
  const R = toRgbItem(r);
  const G = toRgbItem(g);
  const B = toRgbItem(b);
  const Lbg = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  // 白と黒の相対輝度。定義からそれぞれ 1 と 0 になる。
  const Lw = 1;
  const Lb = 0;

  // 白と背景色のコントラスト比、黒と背景色のコントラスト比を
  // それぞれ求める。
  const Cw = (Lw + 0.05) / (Lbg + 0.05);
  const Cb = (Lbg + 0.05) / (Lb + 0.05);

  // コントラスト比が大きい方を文字色として返す。
  return Cw < Cb ? "black" : "white";
}
