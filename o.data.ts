import * as definitions from './o.definitions';

export const weapons: definitions.ItemWeapon[] = [
  {
    name: "None", desc: "Nothin like raw fists.",
    damage: 1, stam_drain: 1,
    type: "weapon",
    equip_data: { level_requirement: 0, tier: 0, value: 0 }
  },
  {
    name: "Wood sword", desc: "Decent starter option.",
    damage: 3, stam_drain: 1,
    type: "weapon",
    equip_data: { level_requirement: 0, tier: 0, value: 2 }
  },
  {
    name: "Iron sword", desc: "Bit rusted.",
    damage: 7, stam_drain: 1,
    type: "weapon",
    equip_data: { level_requirement: 1, tier: 1, value: 5 }
  },
  {
    name: "Iron Battleaxe", desc: "Weighty but a good chop.",
    damage: 10, stam_drain: 2,
    type: "weapon",
    equip_data: { level_requirement: 1, tier: 1, value: 5 }
  },
]

export const enemies: definitions.PlayerStats[] = 
[
  {
    id: "0", name: "Rat", type: "ai",
    health: 5, max_health: 5, armor: 0,
    strength: 2, stamina: 8, max_stamina: 8, speed: 3,
    level: 2,
    money: 5,
  },
  {
    id: "0", name: "Hunk", type: "ai",
    health: 14, max_health: 14, armor: 2,
    strength: 6, stamina: 4, max_stamina: 4, speed: 1,
    level: 6,
    money: 20,
  },
  {
    id: "0", name: "Literally Fucking God", type: "ai",
    health: 1_000_000, max_health: 1_000_000, armor: 250,
    strength: 200, stamina: 100, max_stamina: 100, speed: 35,
    level: 100_000,
    money: 1_000_000_000,
  },
]

