import * as definitions from '../o.definitions';

export const weapons: definitions.ItemWeapon[] = [
  {
    name: "None", desc: "Nothin like raw fists.",
    damage: 1, stam_drain: 1,
    type: "weapon",
    equip_data: { level_requirement: 0, value: 0 }
  },
  {
    name: "Wood sword", desc: "Decent starter option.",
    damage: 3, stam_drain: 1,
    type: "weapon",
    equip_data: { level_requirement: 0, value: 2 }
  },
  {
    name: "Iron sword", desc: "Bit rusted.",
    damage: 7, stam_drain: 1,
    type: "weapon",
    equip_data: { level_requirement: 1, value: 5 }
  },
  {
    name: "Iron Battleaxe", desc: "Weighty but a good chop.",
    damage: 10, stam_drain: 2,
    type: "weapon",
    equip_data: { level_requirement: 1, value: 5 }
  },
]

export const armor: definitions.ItemArmor[] = [
  {
    name: "Wood Helmet",
    desc: "Shoddy head protection",
    type: "armor",
    slot: "head",
    armor: 4,
    equip_data: {
      level_requirement: 1,
      value: 5
    }
  }
]

export const useable: definitions.ItemUseable[] = [
  {
    name: "Cheese",
    desc: "Smelly, but tasty",
    type: "useable",
    usage: "use",
    actions: [
      {
        name: "Cheese Heal",
        type: "consume",
        target: "self",
        change_amount: 2,
        length: 1,
      }
    ]
  },
]

//export const jewelry: definitions.ItemJewelry[] = []

//export const jewelry: definitions.ItemJewelry[] = []