
export interface Commentary {
  moveNumber: number;
  player: 'Human' | 'Bot';
  move: string;
  comment: string;
}

export type Mood =
  | 'confident'   // Bot is winning
  | 'neutral'     // Even game
  | 'worried'     // Bot is losing
  | 'desperate'   // Bot is losing badly
  | 'thinking'    // Processing move
  | 'excited'     // Check/Checkmate/Big moment
  | 'defeated';   // Bot lost the game
