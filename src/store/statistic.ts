import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHero } from 'models/hero';

interface IPlayerStatistic {
  win: number;
  lose: number;
}

interface IHeroStatistic {
  hero: IHero;
  win: number;
  lose: number;
}

interface StatisticState {
  playerStatistic: IPlayerStatistic;
  heroesStatistic: IHeroStatistic[];
}

const initialState: StatisticState = {
  playerStatistic: {
    win: 0,
    lose: 0,
  },
  heroesStatistic: [],
};

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setStatistic(state, action: PayloadAction<StatisticState>) {
      state.heroesStatistic = action.payload.heroesStatistic;
      state.playerStatistic = action.payload.playerStatistic;
    },
    incrementPlayerWin(state) {
      state.playerStatistic.win = state.playerStatistic.win + 1;
    },
    incrementPlayerLose(state) {
      state.playerStatistic.lose = state.playerStatistic.lose + 1;
    },
    incrementHeroWin(state, action: PayloadAction<IHero>) {
      const index = state.heroesStatistic.findIndex(
        (item) => item.hero.id === action.payload.id,
      );

      if (index === -1) {
        state.heroesStatistic = [
          ...state.heroesStatistic,
          { hero: action.payload, win: 1, lose: 0 },
        ];
      } else {
        state.heroesStatistic[index].win++;
      }
    },
    incrementHeroLose(state, action: PayloadAction<IHero>) {
      const index = state.heroesStatistic.findIndex(
        (item) => item.hero.id === action.payload.id,
      );

      if (index === -1) {
        state.heroesStatistic = [
          ...state.heroesStatistic,
          { hero: action.payload, win: 0, lose: 1 },
        ];
      } else {
        state.heroesStatistic[index].lose++;
      }
    },
  },
});

export const {
  setStatistic,
  incrementHeroWin,
  incrementHeroLose,
  incrementPlayerLose,
  incrementPlayerWin,
} = statisticSlice.actions;
export const statisticReducer = statisticSlice.reducer;
