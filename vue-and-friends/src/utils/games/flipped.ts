export enum enumStatus {
  Start = "Start",
  Flipped = "Flipped",
}

export interface Card {
  id: string;
  name: string;
  status: enumStatus;
}
