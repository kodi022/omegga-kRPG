import OmeggaPlugin, { OL, PS, PC, OmeggaPlayer, OmeggaLike, PluginStore } from 'omegga';
import * as database from './o.data';
import * as definitions from './o.definitions';
import * as miscfns from './o.miscfunctions';
type Config = { foo: string };
type Storage = { bar: string };

export class Battles
{
  omegga: OL; config: PC<Config>; store: PS<Storage>;
  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) { 
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }
  
  spawnpoints: number[][] = [];
  fns_misc = new miscfns.MiscFns(Omegga);

  battles: definitions.Battle[] = [];

  async battle_start(player: OmeggaPlayer) {
    // set up battle object
    const player_stats = await this.get_player_stats(player.name);
    let battle_id: string = Math.random().toString(16);
    while (true) {
      if (this.battles.find(b => b.id === battle_id)) battle_id = Math.random().toString(16);
      else break;
    }
    let new_battle: definitions.Battle = {
      id: battle_id,
      round: 0,
      attack_cycle: [player_stats.name],
      team1: [player_stats],
      team2: [],
    }

    // get enemies to fill team2

    // set up attack cycle

    this.fns_misc.print(`${battle_id}`);
  }
  
  mp_battle_start(player: OmeggaPlayer[], enemy: any) {
    for (let p of player) 
    {

    }
    this.fns_misc.print("Amogus");
  }

  pvp_battle_start(team1: OmeggaPlayer[], team2: OmeggaPlayer[]) {

  }


  battle_attack(player: OmeggaPlayer, attack: string, battle_id: string) {

  }

  battle_end(battle_id: string) {
    const battle = this.battles.find(b => b.id === battle_id);
    const battle_index = this.battles.indexOf(battle);

    for (let p of battle.team1) {
      p.stamina = p.max_stamina;







      if (p.xp > p.required_xp) // level up math
      {
        p.level += 1;
        p.skill_points += 1;
        p.required_xp = Math.min(Math.round(5 + ((0.01 * p.level) ** 2.172)), 1000)
      }
    }
    
    delete this.battles[battle_index];
  }



  async get_player_stats(player_name: string) 
  {
    let player = Omegga.getPlayer(player_name);
    if (!player) {this.fns_misc.print("Player not found"); return;}
    let player_stats: definitions.PlayerStats = await this.store.get<any>(`P-${player.id}`) || undefined;
    if (!player_stats) {this.fns_misc.print("Player stats not found"); return;}
    else return player_stats;
  }

  proxy_print(message: string, whisper?: string, options?: {size?: number, color?: string, bold?: boolean, italic?: boolean, code?: boolean}) 
  {
    this.fns_misc.print(message, whisper, {size: options.size, color: options.color, bold: options.bold, italic: options.italic, code: options.code});
  }
}

// export class Stat_Adjust
// {
//   omegga: OL;
//   config: PC<Config>;
//   store: PS<Storage>;
//   constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) { 
//     this.omegga = omegga;
//     this.config = config;
//     this.store = store;
//   }

//   level_up() {

//   }
// }