import { PublicRoutes } from 'routes/PublicRoutes';
import { AuthRoutes } from 'routes/AuthRoutes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useEffect } from 'react';
import { setUser } from './store/user';

export const App = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { playerStatistic, heroesStatistic } = useAppSelector(
    (state) => state.statisticReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userJSON = localStorage.getItem('user');

    if (userJSON) {
      const user = JSON.parse(userJSON);

      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      'statistic',
      JSON.stringify({ playerStatistic, heroesStatistic }),
    );
  }, [playerStatistic, heroesStatistic]);

  return user ? <AuthRoutes /> : <PublicRoutes />;
};
