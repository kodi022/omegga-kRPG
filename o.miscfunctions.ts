import OmeggaPlugin, { OL, PS } from 'omegga';
import * as definitions from './o.definitions';

export class MiscFns
{
  omegga: OL;
  constructor(omegga: OL) { 
    this.omegga = omegga;
  }

  get_player_data(name: string, store: PS) 
  {
    return store.get<any>(`P-${name}`) || undefined;
  }

  set_player_data(player_stats: definitions.PlayerStats, store: PS) 
  {
    store.set<any>(`P-${player_stats.name}`, player_stats);
  }

  print(message: string, whisper?: string, options?: {size?: number, color?: string, bold?: boolean, italic?: boolean, code?: boolean}) 
  {
    if (options.size) message = OMEGGA_UTIL.chat.size(message, options.size);
    if (options.color) message = OMEGGA_UTIL.chat.color(message, options.color);
    if (options.bold) message = OMEGGA_UTIL.chat.bold(message);
    if (options.italic) message = OMEGGA_UTIL.chat.italic(message);
    if (options.code) message = OMEGGA_UTIL.chat.code(message);
    if (whisper) Omegga.whisper(message, whisper);
    else Omegga.broadcast(message);
  }
}