export interface Color {
  idRoot: number;
  id: number;
  name: string;
  ruby: string;
  code: string;
  purchasability: number;
  rarity: Rarity;
}
export interface ColorExtendsRarity extends Color {
  backgroundColor: string;
  borderColor: string;
}

export interface Gacha {
  id: number;
  name: string;
  displayName: string;
  discription: string;
  colorList: Color[];
}

export interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}

export enum Rarity {
  Common = 1,
  Uncommon,
  Rare,
  Epic,
  Legendary
}

export const RarityBackgroundColor = new Map([
  [Rarity.Common, "#E0E0E0"],
  [Rarity.Uncommon, "#81C784"],
  [Rarity.Rare, "#4FC3F7"],
  [Rarity.Epic, "#BA68C8"],
  [Rarity.Legendary, "#FFB74D"]
]);

export const RarityBorderColor = new Map([
  [Rarity.Common, "#9E9E9E"],
  [Rarity.Uncommon, "#4CAF50"],
  [Rarity.Rare, "#03A9F4"],
  [Rarity.Epic, "#9C27B0"],
  [Rarity.Legendary, "#FF9800"]
]);
