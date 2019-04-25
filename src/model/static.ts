import { Rarity, RaritySetting } from "@/model/color";

export const raritySetting: RaritySetting[] = [
  { rarity: Rarity.Common, backgroundColor: "#E0E0E0", borderColor: "#9E9E9E" },
  {
    rarity: Rarity.Uncommon,
    backgroundColor: "#81C784",
    borderColor: "#4CAF50"
  },
  { rarity: Rarity.Rare, backgroundColor: "#4FC3F7", borderColor: "#03A9F4" },
  { rarity: Rarity.Epic, backgroundColor: "#BA68C8", borderColor: "#9C27B0" },
  {
    rarity: Rarity.Legendary,
    backgroundColor: "#FFB74D",
    borderColor: "#FF9800"
  }
];
