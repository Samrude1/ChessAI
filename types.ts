
export interface Commentary {
  moveNumber: number;
  player: 'Human' | 'Bot';
  move: string;
  comment: string;
}

export type Mood = 'neutral' | 'thinking' | 'excited';
