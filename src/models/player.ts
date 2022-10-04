import { IHero } from './hero';
import { IPowerUps } from './user';

export interface IPlayer {
  id: number;
  username: string;
  heroPack: IHero[];
  powerUps: IPowerUps;
}
