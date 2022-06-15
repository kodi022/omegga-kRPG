import * as definitions from '../o.definitions';
import * as items from 'ItemData/items';

export const enemies: definitions.PlayerStats[] = 
[
  {
    id: "0", name: "Rat", type: "ai",
    health: 5, max_health: 5, armor: 0,
    strength: 2, stamina: 8, max_stamina: 8, speed: 3,
    level: 2,
    money: 5,
    drops: [
      {item: items.weapons[1], chance: 0.1},
      {item: items.armor[0], chance: 0.1},
    ]
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