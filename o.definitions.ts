export type PlayerStats = {
  id: string,
  name: string,
  type: "player" | "ai",
  health: number,
  max_health: number,
  armor: number,
  strength: number,
  stamina: number,
  max_stamina: number,
  speed: number,
  skill_points?: number,
  level: number,
  xp?: number,
  required_xp?: number,
  money?: number,
  equipped?: EquipSlots,
  inventory_size?: number,
  inventory?: [],
}
export type Stat = "health" | "armor" | "strength" | "stamina" | "speed";
export type EquipSlots = {
  head?: ItemArmor | "none",
  torso?: ItemArmor | "none",
  leggings?: ItemArmor | "none",
  boots?: ItemArmor | "none",
  gloves?: ItemArmor | "none",
  rings_size?: number, // increase later
  rings?: ItemJewelry[],
  jewelry_size?: number, // increase later
  jewelry?: ItemJewelry[],
}


export type Item = {
  name: string,
  desc: string,
  type: "useable" | "armor" | "weapon" | "jewelry",
}
export interface ItemUseable extends Item {
  usage: "use" | "throw",
  effects: Effect[],
}
export interface ItemArmor extends Item {
  slot: "head" | "torso" | "leggings" | "boots" | "gloves" | "none",
  armor: number,
  actions?: Action[],
  equip_data: Equippable,
}
export interface ItemWeapon extends Item {
  damage: number,
  stam_drain: number,
  actions?: Action[],
  equip_data: Equippable,
}
export interface ItemJewelry extends Item {
  slot: "ring" | "jewelry",
  equip_data: Equippable,
  actions?: Action[],
}
export type Equippable = {
  level_requirement: number,
  tier: number,
  value: number,
}


export type Action = { // special attack
  name: string,
  type: "heal" | "attack" | "buff" | "debuff",
  damage_multiply: number,
  attack_amount: number,
  effects?: Effect[],
}
export type Effect = {
  name: string,
  desc: string,
  strength: number,
  length: number,
}

export type Area = { // wip
  name: string,
  level: number,
  area: {xLo: number, xHi: number, yLo: number, yHi: number, zLo: number, zHi: number}
}

export type Battle = {
  id: string,
  round: number,
  attack_cycle: string[],
  team1: PlayerStats[],
  team2: PlayerStats[],
}