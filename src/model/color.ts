export interface Color {
  idRoot: number;
  id: number;
  name: string;
  ruby: string;
  code: string;
  purchasability: number;
  rarity: Rarity;
}

export interface Gacha {
  id: number;
  name: string;
  displayName: string;
  discription: string;
  colorList: Color[];
}

export enum Rarity {
  Common,
  Uncommon,
  Rare,
  Epic,
  Legendary
}
