import { OmeggaLike } from "omegga";

export type PlayerStats = {
  battling?: boolean;
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
export type Buffs = 
 | "slowness" | "haste" // speed related
 | "poison" | "healing" // health related
 | "frail" | "strength" // damage related
 |  "weakness" | "defence" // defence related
 | "tired" | "energetic" // stamina related

export type Stat = "health" | "armor" | "strength" | "stamina" | "speed";
export type EquipSlots = {
  head?: ItemArmor | "none",
  torso?: ItemArmor | "none",
  leggings?: ItemArmor | "none",
  boots?: ItemArmor | "none",
  gloves?: ItemArmor | "none",
  rings_size?: number, // increases later
  rings?: ItemJewelry[],
  jewelry_size?: number, // increases later
  jewelry?: ItemJewelry[],
}

export type AnyItem = Item | ItemArmor | ItemJewelry | ItemUseable | ItemWeapon;
export type Item = {
  name: string,
  desc: string,
  type: "useable" | "armor" | "weapon" | "jewelry",
}
export interface ItemUseable extends Item {
  usage: "use" | "throw",
  actions: Action[],
}
export interface ItemArmor extends Item {
  slot: "head" | "torso" | "leggings" | "boots" | "gloves" | "none",
  armor: number,
  prefixes?: Prefix[],
  suffixes?: Suffix[],
  actions?: Action[],
  equip_data: Equippable,
}
export interface ItemWeapon extends Item {
  damage: number,
  stam_drain: number,
  prefixes?: Prefix[],
  suffixes?: Suffix[],
  actions?: Action[],
  equip_data: Equippable,
}
export interface ItemJewelry extends Item {
  slot: "ring" | "jewelry",
  prefixes?: Prefix[],
  suffixes?: Suffix[],
  actions?: Action[],
  equip_data: Equippable,
}
export type Equippable = {
  level_requirement: number,
  tier?: ItemTier,
  value: number,
}

export type Prefix = {
  name: string,
  buffs: Buff[],
}

export type Suffix = {
  name: string,
  buffs: Buff[],
}

export type ItemTier = [
  {tier: -1, name: "Weak", multiplier: 0.9}, 
  {tier: 0, name: "Normal", multiplier: 1}, 
  {tier: 1, name: "Decent", multiplier: 1.1}, 
  {tier: 2, name: "Strong", multiplier: 1.18}, 
  {tier: 3, name: "Powerful", multiplier: 1.24}, 
  {tier: 4, name: "Supereme", multiplier: 1.3}, 
  {tier: 5, name: "Immense", multiplier: 1.35}, 
  {tier: 6, name: "Ultimate", multiplier: 1.4}, 
  {tier: 7, name: "Beyond", multiplier: 1.46}, 
]



export type Action = { // special attack/buff (attack, temporary buff/debuff)
  name: string,
  type: "attack" | "consume",
  change_amount: number,
  length: number,
  target: "self" | "friend" | "enemy" ,
  target_effect?: Buffs,
}

export type Buff = { // equippable buff (equipment, passive buff)
  name: string,
  type: "attack" | "consume",
  change_amount: number,
  target_effect: Buffs,
}



export type Area = { // wip
  pos: [number, number, number],
  range: [number, number, number],
  name: string,
  arenas: Arena[],
  enemy_spawns: EnemySpawn[],
  boss_spawns: BossSpawn[],
}

export type Arena = { // wip
  pos: [number, number, number],
  name: string,
  used: boolean,
  area_name: string,
}

export type ArenaSpawns = {
  side1: [
    {x:230,y:0,z:60},
    {x:230,y:100,z:60},
    {x:230,y:-100,z:60},
    {x:230,y:200,z:60},
    {x:230,y:-200,z:60},
  ],
  side2: [
    {x:-230,y:0,z:60},
    {x:-230,y:100,z:60},
    {x:-230,y:-100,z:60},
    {x:-230,y:200,z:60},
    {x:-230,y:-200,z:60},
  ]
}

export type EnemySpawn = {
  pos: [number, number, number],
  range: [number, number, number],
  level: number,  
  chance: number,
  area_name: string,
}
export type BossSpawn = {
  pos: [number, number, number],
  range: [number, number, number],
  boss_name: string,
  level: number,
  area_name: string,
}

export type Battle = {
  id: string,
  arena_id: number,
  round: number,
  attack_cycle: string[],
  team1: PlayerStats[],
  team2: PlayerStats[],
}