import OmeggaPlugin, { OL, PS, PC, OmeggaPlayer, ReadSaveObject, BrickV10, IPlayerPositions } from 'omegga';
import { read_map } from './o.readbricks';
//import * as database from 'ItemData/items';
import * as definitions from './o.definitions';
import battles from './o.functions';
import miscfns from './o.miscfunctions';
type Config = { foo: string };
type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
  omegga: OL; config: PC<Config>; store: PS<Storage>;
  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) { 
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }

  async init() {
    const debug: boolean = this.config["Enable-Debug"];
    const auth: OmeggaPlayer[] = this.config["Authorized-Users"];

    const fns_msc = new miscfns(Omegga);
    const fns_btl = new battles(Omegga, this.config, this.store, fns_msc);
  
    await read_map(fns_btl, fns_msc, debug);

    let positions: IPlayerPositions = [];
    
    Omegga.on('join', async (player: OmeggaPlayer) => {
      const player_data = fns_msc.get_player_data(player.name, this.store);
      if (!player_data) {
        const new_player_data: definitions.PlayerStats =  {
          id: player.id, name: player.name, type: "player", 
          health: 20, max_health: 20, armor: 0, strength: 5, stamina: 10, max_stamina: 10, speed: 5,
          skill_points: 0, level: 1, xp: 0, required_xp: 5,
          money: 50,
          equipped: {},
          inventory_size: 10, inventory: []
        }
        await this.store.set<any>(`P-${player.id}`, new_player_data);
        fns_msc.print(`Created new data for ${player.name}`, "", {size: 12})
      }
    })

    let interval = setInterval( async () => { // for automatic battling
      positions = await Omegga.getAllPlayerPositions();
        for (let a of fns_btl.areas) {
          for (let p of positions) {
            if (fns_msc.inside_range(p.pos, a.pos, a.range)) {

            }
          }
        }
    }, 1500)

    Omegga.on('event:battle', (player: OmeggaPlayer, others: {penemies?: OmeggaPlayer[], enemies?: definitions.PlayerStats[], area?: string}) => { // for debug
      if (!others) return;
      if (others.enemies)
      
      //if ()

      fns_msc.print("debug battle started");
      fns_btl.battle_start(player, others);
    });

    Omegga.on('event:attack', (player: OmeggaPlayer, attack_id: string, battle_id: string) => {
      if (!attack_id || !battle_id) return;
      fns_btl.battle_attack(player, attack_id, battle_id);
    });

    Omegga.on('event:flee', (player: OmeggaPlayer, battle_id: string) => {})

    Omegga.on('cmd:editstat', async (speaker: string, name: string, value: string) => {

    })

    Omegga.on('cmd:refreshmap', async (speaker: string,) => {
      if (auth.find(p => p.name === speaker)) {
        await read_map(fns_btl, fns_msc, debug);
      }
    })

    return { registeredCommands: ['reset', 'editstat', 'fight', 'refreshmap'] };
  }

  async stop() {}
}
