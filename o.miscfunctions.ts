import OmeggaPlugin, { OL, PC, PS } from 'omegga';
import * as definitions from './o.definitions';
type Storage = { bar: string };

export default class MiscFns {
  omegga: OL;
  constructor(omegga: OL) { 
    this.omegga = omegga;
  }

  get_player_data(name: string, store: PS<Storage>) {
    return store.get<any>(`P-${name}`) || undefined;
  }

  set_player_data(player_stats: definitions.PlayerStats, store: PS<Storage>) {
    store.set<any>(`P-${player_stats.name}`, player_stats);
  }

  print(message: string, whisper?: string, options?: {size?: number, color?: string, bold?: boolean, italic?: boolean, code?: boolean}) {
    if (options.size) message = OMEGGA_UTIL.chat.size(message, options.size);
    if (options.color) message = OMEGGA_UTIL.chat.color(message, options.color);
    if (options.bold) message = OMEGGA_UTIL.chat.bold(message);
    if (options.italic) message = OMEGGA_UTIL.chat.italic(message);
    if (options.code) message = OMEGGA_UTIL.chat.code(message);
    if (whisper) Omegga.whisper(message, whisper);
    else Omegga.broadcast(message);
  }

  find_range(data: string) {
    const rangestr: string[] = data.split(",");
    let range: [number, number, number] = [0,0,0];
    for (let i = 0; i < 2; i++) {
      const num = Number(rangestr[i]);
      range[i] = num;
    }
    return range;
  }

  inside_range(pos1: number[], pos2: number[], pos2Range: number[]) {
    let inside: number = 0;
    for (let i = 0; i < 2; i++) {
      if (pos1[i] < pos2[i] + pos2Range[i]  &&  pos1[i] > pos2[i] - pos2Range[i]) {
        inside++;
      }
    }
    if (inside === 3) return true;
    else return false;
  }

  print_debug(message: string) {
    this.print(`DEBUG: ${message}`, "", {size: 13, color: "4a4", code: true});
  }
  
  async paste_zones() {
    let brs = await Omegga.getSaveData();
  }
}