import OmeggaPlugin, { OL, PS, PC, OmeggaPlayer, ReadSaveObject, BrickV10 } from 'omegga';
import * as database from './o.data';
import * as definitions from './o.definitions';
import * as fns from './o.functions';
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

    const fns_battle = new fns.Battles(Omegga, this.config, this.store);

    let brs: ReadSaveObject = await Omegga.getSaveData();
    if (brs.version === 10) {
      for (let brick of brs.bricks) {
        if (brick.components.BCD_Interact.Message) {
          const compo_str: string[] = brick.components.BCD_Interact.ConsoleTag.split(" ");
          if (compo_str[0].startsWith(".")) {
            switch (compo_str[0]) {
              case ".spawnpoint": {
                Omegga.broadcast("Added spawn");
                fns_battle.spawnpoints.push([brick.position[0], brick.position[1], brick.position[2] + 60])
              }
              case ".enemyspawn": {
                Omegga.broadcast("Added spawn");
              }
              case ".a": {
                Omegga.broadcast("Added spawn");
              }
            }
          }
        }   
      }
    }

    brs = null;

    let positions = [];
    
    Omegga.on('join', async (player: OmeggaPlayer) => {
      const player_data = await this.store.get<any>(`P-${player.id}`) || undefined;
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
      }
    })

    // let interval = setInterval( async () => { // for automatic battling
    //   positions = await Omegga.getAllPlayerPositions();
    // }, 1500)

    Omegga.on('event:battle', (player: OmeggaPlayer, ...enemies: OmeggaPlayer[]) => { // for debug
      if (!enemies) return;
      fns_battle.proxy_print("debug battle started");
      fns_battle.battle_start(player);
    });

    Omegga.on('event:attack', (player: OmeggaPlayer, attack_id: string, battle_id: string) => {
      if (!attack_id || !battle_id) return;
      fns_battle.battle_attack(player, attack_id, battle_id);
    });

    Omegga.on('event:flee', (player: OmeggaPlayer, battle_id: string) => {})

    Omegga.on('event:idk', () => {})

    Omegga.on('cmd:editstat', async (speaker: string, name: string, value: string) => {

    })

    return { registeredCommands: ['reset', 'editstat', 'fight'] };
  }

  async stop() {}
}
