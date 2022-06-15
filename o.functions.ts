import OmeggaPlugin, { OL, PS, PC, OmeggaPlayer, OmeggaLike, PluginStore } from 'omegga';
import * as items from 'ItemData/items';
import * as definitions from './o.definitions';
import MiscFns from './o.miscfunctions';
type Config = { foo: string };
type Storage = { bar: string };

export default class Battles {
  omegga: OL; config: PC<Config>; store: PS<Storage>; fns_msc: MiscFns;
  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>, fns_msc: MiscFns) { 
    this.omegga = omegga;
    this.config = config;
    this.store = store;
    this.fns_msc = fns_msc;
  }
  
  buffer_enemyspawns: definitions.EnemySpawn[] = []; // these get put in parent objects after iterating bricks
  buffer_bossspawns: definitions.BossSpawn[] = []; 
  buffer_arenas: definitions.Arena[] = [];

  world_spawns: number[][] = []; // world spawn for death or returning
  proxy_spawnpoints: number[][] = []; // go here on death, then tp to world spawn
  areas: definitions.Area[] = [];
  
  battles: definitions.Battle[] = [];

  async battle_start(player: OmeggaPlayer, e: {penemies?: OmeggaPlayer[], enemies?: definitions.PlayerStats[], area?: string}) {
    // set up battle object



    let enemies: definitions.PlayerStats[];
    if (e.penemies) {

    } else if (e.enemies) {

    } else if (e.area) {

    }

    let player_stats = await this.get_player_stats(player.name);
    let battle_id: string = Math.random().toString(16);
    while (true) {
      if (this.battles.find(b => b.id === battle_id)) battle_id = Math.random().toString(16);
      else break;
    }

    let new_battle: definitions.Battle = {
      id: battle_id,
      arena_id: 0,
      round: 0,
      attack_cycle: [player_stats.name],
      team1: [player_stats],
      team2: enemies,
    }
    // find empty arena

    // get enemies to fill team2

    // set up attack cycle

    this.fns_msc.print(`${battle_id}`);
  }
  
  mp_battle_start(player: OmeggaPlayer[], enemy: any) {
    for (let p of player) {

    }
    this.fns_msc.print("Amogus");
  }

  pvp_battle_start(team1: OmeggaPlayer[], team2: OmeggaPlayer[]) {

  }


  battle_attack(player: OmeggaPlayer, attack: string, battle_id: string) {

  }

  battle_end(battle_id: string) {
    const battle = this.battles.find(b => b.id === battle_id);
    const battle_index = this.battles.indexOf(battle);

    for (let p of battle.team1) { // end of battle stats
      p.stamina = p.max_stamina;







      if (p.xp > p.required_xp) { // level up math
        p.level += 1;
        p.skill_points += 1;
        p.required_xp = Math.min(Math.round(5 + ((0.01 * p.level) ** 2.172)), 1000)
      }
    }
    
    delete this.battles[battle_index];
  }


  find_enemies(area: string) {

  }


  async get_player_stats(player_name: string) {
    let player = Omegga.getPlayer(player_name);
    if (!player) {this.fns_msc.print("Player not found"); return;}
    let player_stats: definitions.PlayerStats = await this.store.get<any>(`P-${player.id}`) || undefined;
    if (!player_stats) {this.fns_msc.print("Player stats not found"); return;}
    else return player_stats;
  }
}