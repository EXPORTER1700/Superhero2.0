import { IHero } from './hero';

export interface IPowerUps {
  updatedAt: Date;
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  heroPack: IHero[];
  powerUps: IPowerUps;
}
