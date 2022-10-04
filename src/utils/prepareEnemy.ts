import {
  ALL_HERO_COUNT,
  BOT_USERNAMES,
  MAX_HERO_PACK_LENGTH,
} from 'constants/index';
import { IPlayer } from 'models/player';
import { HeroService } from 'services/HeroService';

export const prepareEnemy = async (): Promise<IPlayer> => {
  const enemy: IPlayer = {
    id: Date.now(),
    username: BOT_USERNAMES[Math.floor(Math.random() * BOT_USERNAMES.length)],
    heroPack: [],
    powerUps: {
      updatedAt: new Date(),
      power: Math.floor(Math.random() * 2),
      intelligence: Math.floor(Math.random() * 2),
      durability: Math.floor(Math.random() * 2),
      speed: Math.floor(Math.random() * 2),
      combat: Math.floor(Math.random() * 2),
      strength: Math.floor(Math.random() * 2),
    },
  };

  const ids = [];

  for (let i = 0; i < MAX_HERO_PACK_LENGTH; i++) {
    const id = Math.floor(Math.random() * ALL_HERO_COUNT);
    ids.push(id);
  }

  enemy.heroPack = await Promise.all(
    ids.map(async (id) => {
      const hero = await HeroService.getOneById(id);
      return hero;
    }),
  );

  return enemy;
};
