export interface Color {
  idBase: number;
  idEachGacha: number;
  name: string;
  ruby: string;
  code: string;
  rarity: Rarity;
  purchasability: number;
}

export interface Gacha {
  id: number;
  name: string;
  displayName: string;
  discription: string;
  colorList: Color;
}

export enum Rarity {
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary"
}
