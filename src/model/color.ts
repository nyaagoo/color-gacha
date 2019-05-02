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

export enum Rarity {
  Common = 1,
  Uncommon,
  Rare,
  Epic,
  Legendary
}
export interface RaritySetting {
  rarity: Rarity;
  backgroundColor: string;
  borderColor: string;
}

export interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}
