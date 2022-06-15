import Battles from './o.functions';
import MiscFns from './o.miscfunctions';
import OmeggaPlugin, { ReadSaveObject } from 'omegga';
import * as definitions from './o.definitions';
type Config = { foo: string };
type Storage = { bar: string };

export const read_map = async (fns_btl: Battles, fns_msc: MiscFns, debug: boolean) => {
  if (debug) fns_msc.print_debug("Reading Bricks...");
  const brs: ReadSaveObject = await Omegga.getSaveData();
  if (brs.version === 10) {
    if (brs.bricks.length === 0) return;
    fns_btl.areas = [];

    for (let brick of brs.bricks) {
      if (brick.components.BCD_Interact === undefined) { continue; }
      if (brick.components.BCD_Interact.Message === undefined) { continue; }
      if (!brick.components.BCD_Interact.Message.startsWith(".")) { continue; }

      const compo_str: string[] = brick.components.BCD_Interact.Message.split(" ");
      let data: string[] = [];
      for (let s in compo_str) {
        if (!compo_str[s].startsWith(".")) data[s] = compo_str[s].slice(2);
        else data[s] = compo_str[s];
      }

      switch (compo_str[0]) {
        case ".spawn": {
          fns_btl.world_spawns.push([brick.position[0], brick.position[1], brick.position[2] + 60]);
          if (debug) fns_msc.print_debug("# Added spawn");
          break;
        }

        case ".proxyspawn": {
          fns_btl.proxy_spawnpoints.push([brick.position[0], brick.position[1], brick.position[2] + 60]);
          if (debug) fns_msc.print_debug("# Added proxy spawn");
          break;
        }  

        case ".espawn": { // set up enemy spawn stats
          if (data.length !== 5) {
            console.log(data.length);
            fns_msc.print_debug(`Enemy spawn (${data.join(' ')}) requires`);
            fns_msc.print_debug(` - 1.x,y,z range, 2.level, 3.chance-per-second, 4.area`);
            fns_msc.print_debug(' - like following (.espawn 1:15,15,10 2:10 3:0.5 4:areaname)');
            continue;
          } else {
            let spawn: definitions.EnemySpawn = {
              pos: [0,0,0], range: [0,0,0], level: 0, chance: 0, area_name: ""
            };

            spawn.pos = brick.position;

            const range: [number, number, number] = fns_msc.find_range(data[1]); // seperate x y z of range
            if (range.find(num => isNaN(num))) { 
              fns_msc.print_debug(`Enemy spawn (${data.join(' ')}) has invalid range field`); continue;
            } else spawn.range = range;

            const lvl: number = Number(data[2]);
            if (isNaN(lvl)) { 
              fns_msc.print_debug(`Enemy spawn (${data.join(' ')}) has invalid level field`); continue; 
            } else spawn.level = lvl;

            const spawn_chance = Number(data[3]);
            if (isNaN(spawn_chance)) { 
              fns_msc.print_debug(`Enemy spawn (${data.join(',')}) has invalid chance field`); continue; 
            } else spawn.chance = spawn_chance;

            spawn.area_name = data[4];
            fns_btl.buffer_enemyspawns.push(spawn);
          }
          if (debug) fns_msc.print_debug("# Added enemy spawn");
          break;
        }

        case ".bspawn": { // set up boss spawn stats
          if (data.length !== 5) {
            fns_msc.print_debug(`Boss spawn (${data.join(' ')}) requires`);
            fns_msc.print_debug(` - 1.x,y,z range, 2.bossname, 3.level, 4.areaname`);
            fns_msc.print_debug(' - like following (.bspawn 1:15,15,10 2:bossname 3:10 4:areaname)');
            continue;
          } else {
            let bspawn: definitions.BossSpawn = {
              pos: [0,0,0], range: [0,0,0], boss_name: "", level: 0, area_name: ""
            };

            bspawn.pos = brick.position;

            const range: [number, number, number] = fns_msc.find_range(data[1]); // seperate x y z of range
            if (range.find(num => isNaN(num))) { 
              fns_msc.print_debug(`Boss spawn (${data.join(' ')}) has invalid range field`); continue;
            } else bspawn.range = range;

            bspawn.boss_name = data[2];

            const lvl: number = Number(data[3]);
            if (isNaN(lvl)) { 
              fns_msc.print_debug(`Boss spawn (${data.join(' ')}) has invalid level field`); continue; 
            } else bspawn.level = lvl;

            bspawn.area_name = data[4];
            fns_btl.buffer_bossspawns.push(bspawn);
          }
          if (debug) fns_msc.print_debug("# Added boss spawn");
          break;
        }

        case ".area": {
          if (data.length !== 3) {
            fns_msc.print_debug(`Area (${data.join(' ')}) requires`);
            fns_msc.print_debug(` - 1.x,y,z range, 2.areaname`);
            fns_msc.print_debug(' - like following (.area 1:15,15,10 2:areaname)');
            continue;
          } else {
            let area: definitions.Area = {
              pos: [0,0,0], range: [0,0,0], name: "", arenas: [], enemy_spawns: [], boss_spawns: [],
            };

            area.pos = brick.position;

            const range: [number, number, number] = fns_msc.find_range(data[1]); // seperate x y z of range
            if (range.find(num => isNaN(num))) { 
              fns_msc.print_debug(`Area (${data.join(' ')}) has invalid range field`); continue;
            } else area.range = range;

            area.name = data[2];
            fns_btl.areas.push(area);
          }
          if (debug) fns_msc.print_debug("# Added area");
          break;
        }

        case ".arena": {
          if (data.length !== 3) {
            fns_msc.print_debug(`Arena (${data.join(' ')}) requires`);
            fns_msc.print_debug(` - 1.areaname, 2.ARENAname`);
            fns_msc.print_debug(' - like following (.arena 1.areaname 2:ARENAname)');
            continue;
          } else {
            let arena: definitions.Arena = {
              pos: [0,0,0], name: "", used: false, area_name: "",
            };

            arena.pos = brick.position;

            arena.area_name = data[1];

            arena.name = data[2];

            fns_btl.buffer_arenas.push(arena);
          }
          if (debug) fns_msc.print_debug("# Added arena");
          break;
        }

        default: {
          if (debug) fns_msc.print_debug(`!! ${compo_str[0]} does not exist.`);
          break;
        }
      }
    }
    // since we dont know how the bricks get iterated through, we cant apply to parents as
    // they might not exist yet, so we pair them afterward
    // handle buffer_enemyspawns
    for (let s in fns_btl.buffer_enemyspawns) {
      for (let a in fns_btl.areas) {
        if (fns_btl.buffer_enemyspawns[s].area_name === fns_btl.areas[a].name) {
          fns_btl.areas[a].enemy_spawns.push(fns_btl.buffer_enemyspawns[s]);
          if (debug) fns_msc.print_debug('- Pushed enemyspawn');
        }
      }
    }
    // handle buffer_bossspawns
    for (let s in fns_btl.buffer_bossspawns) {
      for (let a in fns_btl.areas) {
        if (fns_btl.buffer_bossspawns[s].area_name === fns_btl.areas[a].name) {
          fns_btl.areas[a].boss_spawns.push(fns_btl.buffer_bossspawns[s]);
          if (debug) fns_msc.print_debug('- Pushed bossspawn');
        }
      }
    }
    // handle buffer_arenas, specifically after arenaspawns since they push into arenas
    for (let s in fns_btl.buffer_arenas) {
      for (let a in fns_btl.areas) {
        if (fns_btl.buffer_arenas[s].area_name === fns_btl.areas[a].name) {
          fns_btl.areas[a].arenas.push(fns_btl.buffer_arenas[s]);
          if (debug) fns_msc.print_debug('- Pushed arena');
        }
      }
    }
    fns_btl.buffer_enemyspawns = []; // clear each after use, they are now useless
    fns_btl.buffer_bossspawns = [];
    fns_btl.buffer_arenas = [];
  }
}